<script setup lang="ts">
import { computed } from 'vue'
import { playerStore } from '@/store/players'
import { roundStore, type Round } from '@/store/rounds'
import {
  AllCommunityModule,
  ModuleRegistry,
  colorSchemeDark,
  themeQuartz,
  type ColDef,
} from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import ConfirmModal from '@/components/ConfirmModal.vue'
import EditableHeader from '@/components/EditableHeader.vue'
import TableStencil from '@/components/TableStencil.vue'
import { useConfirmModal } from '@/composables/useConfirmModal'
ModuleRegistry.registerModules([AllCommunityModule])

const themeQuartzDark = themeQuartz.withPart(colorSchemeDark)

const columnDefs = computed(() => {
  const totalsColumn: ColDef = {
    field: 'roundId',
    headerName: 'Round',
    lockPinned: true,
    pinned: 'left',
    width: 110,
    valueFormatter({ value }) {
      const valueWithoutLetters = value.replace(/[a-zA-Z]/g, '')
      return value === 'Totals' ? 'Totals' : valueWithoutLetters
    },
    sort: 'desc',
    comparator: (valueA, valueB) => {
      const valueWithoutLettersA = Number(valueA.replace(/[a-zA-Z]/g, ''))
      const valueWithoutLettersB = Number(valueB.replace(/[a-zA-Z]/g, ''))

      return valueWithoutLettersA - valueWithoutLettersB
    },
  }

  const playerColumns = playerStore.players.map<ColDef>((player) => ({
    editable: (params) => params.data.roundId !== 'Totals',
    enableCellChangeFlash: true,
    cellEditor: 'agNumberCellEditor',
    cellEditorParams: {
      min: -10, // Minimum score accounting for negative points from red kings and house rules.
      max: 320, // This is the max possible score if a player has all cards in a deck without red kings.
      step: 1,
    },
    field: player.id,
    headerName: player.name,
    headerComponent: EditableHeader,
    initialWidth: 120,
    valueFormatter(params) {
      const { data, value } = params
      const mod50 = value % 50
      return data.roundId === 'Totals' && mod50 < value ? `${mod50} (${value})` : value
    },
    onCellValueChanged(event) {
      const { colDef, data, newValue } = event
      if (data.roundId === 'Totals') return
      roundStore.updateRound(data.roundId, colDef.field!, newValue)
    },
    sortable: false,
  }))

  return [totalsColumn, ...playerColumns]
})

const rowData = computed(() =>
  roundStore.rounds.map((round) => {
    const row: Record<string, number | string> = { roundId: round.roundId }
    for (const player of playerStore.players) {
      row[player.id] = round[player.id] || 0
    }
    return row
  }),
)

const totalsRow = computed(() =>
  playerStore.players.reduce(
    (acc, player) => {
      acc[player.id] = roundStore.rounds.reduce(
        (sum, round) => sum + Number(round[player.id] || 0),
        0,
      )
      return acc
    },
    { roundId: 'Totals' } as Round,
  ),
)

function addPlayer() {
  const newPlayerId = `player${playerStore.players.length + 1}`
  playerStore.addPlayer({ id: newPlayerId, name: `Player ${playerStore.players.length + 1}` })
}

function addRound() {
  const newRoundId = `round${roundStore.rounds.length + 1}`
  const newRound: Round = { roundId: newRoundId }
  for (const player of playerStore.players) {
    newRound[player.id] = 0
  }
  roundStore.addRound(newRound)
}

// Modal functionality using composable
const { modalRef: confirmModal, show: showConfirmModal, hide: hideConfirmModal } = useConfirmModal()

const confirmResetRounds = () => {
  showConfirmModal()
}

const handleConfirmReset = () => {
  roundStore.resetRounds()
  hideConfirmModal()
}
</script>

<template>
  <div class="ag-theme-quartz-dark ag-grid-wrapper">
    <div class="control-panel">
      <!-- Control panel -->
      <button class="primary" @click="addPlayer">Add Player</button>
      <button class="primary" @click="addRound">Add Round</button>
      <button class="secondary" @click="confirmResetRounds">Reset Rounds</button>
    </div>

    <!-- Loading state -->
    <TableStencil 
      v-if="!roundStore.isLoaded || !playerStore.isLoaded"
      :column-count="Math.max(playerStore.players.length, 3)"
      :row-count="Math.max(roundStore.rounds.length, 4)"
    />

    <!-- Main grid -->
    <AgGridVue
      v-else
      :columnDefs="columnDefs"
      :domLayout="'autoHeight'"
      :pinnedTopRowData="[totalsRow]"
      :rowData="rowData"
      :theme="themeQuartzDark"
      :getRowId="(params) => String(params.data.roundId)"
    />

    <!-- Confirm Modal -->
    <ConfirmModal
      ref="confirmModal"
      title="Reset All Rounds"
      message="Are you sure you want to reset all rounds? This will clear all scores and cannot be undone."
      confirmText="Reset"
      cancelText="Cancel"
      variant="danger"
      @confirm="handleConfirmReset"
      @cancel="hideConfirmModal"
      @close="hideConfirmModal"
    />
  </div>
</template>

<style scoped>
.ag-grid-wrapper {
  position: relative;
  width: 100%;
}

.control-panel {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;

  & button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &.primary {
      color: white;
      background-color: #46a049;

      &:hover {
        background-color: #2c652e;
      }
    }

    &.secondary {
      background: #374151;
      color: #d1d5db;
      border-color: #4b5563;

      &:hover {
        background: #4b5563;
        border-color: #6b7280;
      }
    }
  }
}
</style>
