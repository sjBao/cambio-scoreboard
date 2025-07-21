import { ref } from 'vue'
import type { ConfirmModalProps } from '@/components/ConfirmModal.vue'

export interface UseConfirmModalOptions extends ConfirmModalProps {
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

export function useConfirmModal() {
  const modalRef = ref()
  const isOpen = ref(false)

  const show = () => {
    if (modalRef.value) {
      isOpen.value = true
      modalRef.value.show()
    }
  }

  const hide = () => {
    if (modalRef.value) {
      modalRef.value.hide()
      isOpen.value = false
    }
  }

  const setLoading = (loading: boolean) => {
    if (modalRef.value) {
      modalRef.value.setLoading(loading)
    }
  }

  return {
    modalRef,
    isOpen,
    show,
    hide,
    setLoading,
  }
}

// Helper functions for common use cases
export const confirmDelete = (itemName: string = 'this item') => ({
  title: 'Delete Item',
  message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
  confirmText: 'Delete',
  cancelText: 'Cancel',
  variant: 'danger' as const,
})

export const confirmSave = (hasChanges: boolean = true) => ({
  title: 'Save Changes',
  message: hasChanges
    ? 'You have unsaved changes. Do you want to save them?'
    : 'Do you want to save the current state?',
  confirmText: 'Save',
  cancelText: 'Discard',
  variant: 'info' as const,
})

export const confirmLeave = () => ({
  title: 'Leave Page',
  message: 'You have unsaved changes. Are you sure you want to leave? All changes will be lost.',
  confirmText: 'Leave',
  cancelText: 'Stay',
  variant: 'warning' as const,
})
