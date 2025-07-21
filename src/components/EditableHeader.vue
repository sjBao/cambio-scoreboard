<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { playerStore } from '@/store/players'

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
    <span v-else class="header-text" @click="startEdit" @dblclick="startEdit">
      {{ displayName }}
    </span>
    <button v-if="!isEditing" class="edit-icon" @click="startEdit" title="Edit player name">
      ✏️
    </button>
  </div>
</template>

<style>
/* Global styles for AG Grid header component */
.editable-header {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-height: 20px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.editable-header:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
  width: 100%;
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
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.editable-header:hover .edit-icon {
  opacity: 0.9;
}
</style>
