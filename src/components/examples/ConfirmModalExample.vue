<template>
  <div>
    <h2>Confirm Modal Examples</h2>

    <!-- Basic usage buttons -->
    <div class="button-group">
      <button @click="showBasicConfirm" class="btn">Basic Confirm</button>
      <button @click="showDeleteConfirm" class="btn btn-danger">Delete Item</button>
      <button @click="showAsyncConfirm" class="btn btn-warning">Async Action</button>
    </div>

    <!-- The modal component -->
    <ConfirmModal
      ref="confirmModal"
      :title="modalProps.title"
      :message="modalProps.message"
      :confirmText="modalProps.confirmText"
      :cancelText="modalProps.cancelText"
      :variant="modalProps.variant"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { confirmDelete } from '@/composables/useConfirmModal'

const confirmModal = ref()

const modalProps = reactive({
  title: 'Confirm Action',
  message: 'Are you sure you want to continue?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info' as 'danger' | 'warning' | 'info' | 'success',
})

const currentAction = ref<(() => void | Promise<void>) | null>(null)

const showModal = (props: typeof modalProps, action?: () => void | Promise<void>) => {
  Object.assign(modalProps, props)
  currentAction.value = action || null
  confirmModal.value?.show()
}

const showBasicConfirm = () => {
  showModal(
    {
      title: 'Basic Confirmation',
      message: 'This is a basic confirmation dialog. Do you want to proceed?',
      confirmText: 'Yes, proceed',
      cancelText: 'No, cancel',
      variant: 'info',
    },
    () => {
      console.log('Basic action confirmed!')
      alert('Action confirmed!')
    },
  )
}

const showDeleteConfirm = () => {
  const deleteProps = confirmDelete('Player 1')
  showModal(deleteProps, async () => {
    console.log('Deleting player...')
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Player deleted!')
    alert('Player deleted successfully!')
  })
}

const showAsyncConfirm = () => {
  showModal(
    {
      title: 'Async Action',
      message: 'This will perform an async operation that takes a few seconds.',
      confirmText: 'Start Process',
      cancelText: 'Cancel',
      variant: 'warning',
    },
    async () => {
      console.log('Starting async process...')
      // Simulate a longer operation
      await new Promise((resolve) => setTimeout(resolve, 3000))
      console.log('Async process completed!')
      alert('Process completed successfully!')
    },
  )
}

const handleConfirm = async () => {
  if (currentAction.value) {
    try {
      await currentAction.value()
      confirmModal.value?.hide()
    } catch (error) {
      console.error('Action failed:', error)
      confirmModal.value?.setLoading(false)
      alert('Action failed: ' + error)
    }
  } else {
    confirmModal.value?.hide()
  }
}

const handleCancel = () => {
  console.log('Action cancelled')
  currentAction.value = null
}

const handleClose = () => {
  console.log('Modal closed')
  currentAction.value = null
}
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  background: #3b82f6;
  color: white;
}

.btn:hover {
  background: #2563eb;
}

.btn-danger {
  background: #dc2626;
}

.btn-danger:hover {
  background: #b91c1c;
}

.btn-warning {
  background: #d97706;
}

.btn-warning:hover {
  background: #b45309;
}
</style>
