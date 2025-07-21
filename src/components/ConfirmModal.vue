<template>
  <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" :data-variant="variant" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
      </div>

      <div class="modal-body">
        <p class="modal-message">{{ message }}</p>
      </div>

      <div class="modal-footer">
        <button class="btn btn-cancel" @click="handleCancel" :disabled="loading">
          {{ cancelText }}
        </button>
        <button
          class="btn btn-confirm"
          @click="handleConfirm"
          :disabled="loading"
          :class="{ loading: loading }"
        >
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Processing...' : confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface ConfirmModalProps {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info' | 'success'
  closeOnOverlayClick?: boolean
}

const props = withDefaults(defineProps<ConfirmModalProps>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to continue?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info',
  closeOnOverlayClick: true,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const isVisible = ref(false)
const loading = ref(false)

const show = () => {
  isVisible.value = true
  console.log('****** hello???? show', isVisible)
}

const hide = () => {
  isVisible.value = false
  loading.value = false
}

const handleConfirm = async () => {
  loading.value = true
  emit('confirm')
  // Don't automatically hide - let the parent component handle it
}

const handleCancel = () => {
  emit('cancel')
  hide()
}

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick && !loading.value) {
    emit('close')
    hide()
  }
}

// Expose methods for parent components
defineExpose({
  show,
  hide,
  setLoading: (value: boolean) => {
    loading.value = value
  },
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  animation: slideIn 0.2s ease-out;
}

.modal-header {
  padding: 20px 24px 0;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.modal-body {
  padding: 16px 24px;
}

.modal-message {
  margin: 0;
  color: #6b7280;
  line-height: 1.5;
}

.modal-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 80px;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #f9fafb;
  color: #374151;
  border-color: #d1d5db;
}

.btn-cancel:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-confirm:hover:not(:disabled) {
  background: #2563eb;
  border-color: #2563eb;
}

/* Variant styles */
.btn-confirm.loading {
  background: #6b7280;
  border-color: #6b7280;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .modal-container {
    background: #1f2937;
    color: #f9fafb;
  }

  .modal-header {
    border-bottom-color: #374151;
  }

  .modal-title {
    color: #f9fafb;
  }

  .modal-message {
    color: #d1d5db;
  }

  .btn-cancel {
    background: #374151;
    color: #d1d5db;
    border-color: #4b5563;
  }

  .btn-cancel:hover:not(:disabled) {
    background: #4b5563;
    border-color: #6b7280;
  }
}

/* Variant-specific confirm button styles */
.modal-container[data-variant='danger'] .btn-confirm {
  background: #dc2626;
  border-color: #dc2626;
}

.modal-container[data-variant='danger'] .btn-confirm:hover:not(:disabled) {
  background: #b91c1c;
  border-color: #b91c1c;
}

.modal-container[data-variant='warning'] .btn-confirm {
  background: #d97706;
  border-color: #d97706;
}

.modal-container[data-variant='warning'] .btn-confirm:hover:not(:disabled) {
  background: #b45309;
  border-color: #b45309;
}

.modal-container[data-variant='success'] .btn-confirm {
  background: #059669;
  border-color: #059669;
}

.modal-container[data-variant='success'] .btn-confirm:hover:not(:disabled) {
  background: #047857;
  border-color: #047857;
}
</style>
