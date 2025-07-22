<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { playerStore } from '@/store/players'
import { useConfirmModal, confirmDelete } from '@/composables/useConfirmModal'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

interface Props {
  params: {
    column: {
      colId: string
    }
    displayName: string
  }
}

const props = defineProps<Props>()

const isEditing = ref(false)
const editValue = ref('')
const inputRef = ref<HTMLInputElement>()
const displayName = ref(props.params.displayName)

// Confirm modal setup
const { modalRef, show: showConfirmModal, hide: hideConfirmModal } = useConfirmModal()

onMounted(() => {
  // Find the player by field (colId)
  const player = playerStore.players.find((p) => p.id === props.params.column.colId)
  if (player?.name) {
    displayName.value = player.name
  }
})

const startEdit = async () => {
  editValue.value = displayName.value
  isEditing.value = true
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

const finishEdit = () => {
  if (editValue.value.trim() && editValue.value !== displayName.value) {
    // Update the player name in the store
    const playerId = props.params.column.colId
    playerStore.updatePlayerName(playerId, editValue.value.trim())
    displayName.value = editValue.value.trim()
  }
  isEditing.value = false
}

const cancelEdit = () => {
  editValue.value = displayName.value
  isEditing.value = false
}

const deletePlayer = () => {
  if (playerStore.players.length <= playerStore.minPlayers) {
    alert(`Cannot remove player. Minimum of ${playerStore.minPlayers} players required.`)
    return
  }

  showConfirmModal()
}

const handleConfirmDelete = () => {
  const playerId = props.params.column.colId
  playerStore.removePlayer(playerId)
  hideConfirmModal()
}

const handleCancelDelete = () => {
  hideConfirmModal()
}
</script>

<template>
  <div class="editable-header">
    <input
      v-if="isEditing"
      ref="inputRef"
      v-model="editValue"
      class="header-input"
      @blur="finishEdit"
      @keyup.enter="finishEdit"
      @keyup.escape="cancelEdit"
    />
    <div v-else class="player-name-section">
      <span class="header-text" @click="startEdit" @dblclick="startEdit">
        {{ displayName }}
      </span>
      <button class="edit-icon" @click="startEdit" title="Edit player name">
        <IconEdit />
      </button>
    </div>
    <button v-if="!isEditing" class="delete-icon" @click="deletePlayer" title="Remove player">
      <IconDelete />
    </button>
  </div>

  <!-- Confirm Modal - Teleported to body to escape AG-Grid container -->
  <Teleport to="body">
    <ConfirmModal
      ref="modalRef"
      v-bind="confirmDelete(displayName)"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
      @close="handleCancelDelete"
    />
  </Teleport>
</template>

<style>
/* Global styles for AG Grid header component */
.editable-header {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-height: 20px;
  padding: 2px 4px;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.player-name-section {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  cursor: pointer;
  border-radius: 2px;
  padding: 2px;
  margin: -2px;
  transition: background-color 0.2s ease;
}

.player-name-section:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.header-text {
  flex: 1;
}

.editable-header input.header-input {
  background: #374151;
  color: #f9fafb;
  border: 1px solid #6b7280;
  border-radius: 2px;
  padding: 2px 4px;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  width: calc(100%);
}

.editable-header .header-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.editable-header .edit-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editable-header .delete-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  opacity: 1;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
  width: 18px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  flex-shrink: 0;
  align-self: center;
}

.editable-header .delete-icon:hover {
  color: rgba(155, 165, 181, 1);
  background-color: rgba(107, 114, 128, 0.1);
}

.editable-header .edit-icon svg {
  width: 12px;
  height: 12px;
}

.editable-header .delete-icon svg {
  width: 14px;
  height: 16px;
}

.player-name-section:hover .edit-icon {
  opacity: 0.6;
}
</style>
