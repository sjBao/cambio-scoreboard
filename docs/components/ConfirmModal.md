# ConfirmModal Component

A generic, reusable confirm modal component for Vue 3 applications with TypeScript support.

## Features

- 🎨 **Multiple variants**: `info`, `warning`, `danger`, `success`
- ⚡ **Async support**: Handle async operations with loading states
- 🌙 **Dark mode**: Automatic dark theme support
- 🎯 **TypeScript**: Full type safety
- 🔧 **Customizable**: All text, colors, and behaviors can be customized
- 🎪 **Animations**: Smooth enter/exit animations
- ♿ **Accessible**: Keyboard navigation and proper focus management

## Quick Start

```vue
<template>
  <ConfirmModal
    ref="modal"
    title="Delete Item"
    message="Are you sure you want to delete this item?"
    variant="danger"
    @confirm="handleDelete"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import ConfirmModal from '@/components/ConfirmModal.vue'

const modal = ref()
const handleDelete = () => console.log('Deleted!')
const handleCancel = () => console.log('Cancelled!')
</script>
```

## Examples

📖 **Live Examples**: See `src/components/examples/ConfirmModalExample.vue` for interactive demos

## API Reference

### Props

| Prop                  | Type                                           | Default                                | Description                                   |
| --------------------- | ---------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| `title`               | `string`                                       | `'Confirm Action'`                     | Modal title                                   |
| `message`             | `string`                                       | `'Are you sure you want to continue?'` | Modal message                                 |
| `confirmText`         | `string`                                       | `'Confirm'`                            | Confirm button text                           |
| `cancelText`          | `string`                                       | `'Cancel'`                             | Cancel button text                            |
| `variant`             | `'info' \| 'warning' \| 'danger' \| 'success'` | `'info'`                               | Modal variant (affects confirm button color)  |
| `closeOnOverlayClick` | `boolean`                                      | `true`                                 | Whether clicking the overlay closes the modal |

### Events

| Event      | Description                                        |
| ---------- | -------------------------------------------------- |
| `@confirm` | Emitted when the confirm button is clicked         |
| `@cancel`  | Emitted when the cancel button is clicked          |
| `@close`   | Emitted when the modal is closed via overlay click |

### Methods

The modal component exposes these methods via `ref`:

| Method                | Description                         |
| --------------------- | ----------------------------------- |
| `show()`              | Show the modal                      |
| `hide()`              | Hide the modal                      |
| `setLoading(boolean)` | Set loading state on confirm button |

## Variants

### Info (Default)

```typescript
{
  variant: 'info', // Blue confirm button
  title: 'Information',
  message: 'This is an informational message.'
}
```

### Warning

```typescript
{
  variant: 'warning', // Orange confirm button
  title: 'Warning',
  message: 'This action may have consequences.'
}
```

### Danger

```typescript
{
  variant: 'danger', // Red confirm button
  title: 'Delete Item',
  message: 'This action cannot be undone.'
}
```

### Success

```typescript
{
  variant: 'success', // Green confirm button
  title: 'Confirm Save',
  message: 'Save changes successfully?'
}
```

## Helper Functions

The `useConfirmModal.ts` composable includes helper functions for common scenarios:

```typescript
import { confirmDelete, confirmSave, confirmLeave } from '@/composables/useConfirmModal'

// Delete confirmation
const deleteProps = confirmDelete('Player 1')
// Returns: { title: 'Delete Item', message: '...', variant: 'danger', ... }

// Save confirmation
const saveProps = confirmSave(true) // hasChanges: boolean
// Returns: { title: 'Save Changes', message: '...', variant: 'info', ... }

// Leave page confirmation
const leaveProps = confirmLeave()
// Returns: { title: 'Leave Page', message: '...', variant: 'warning', ... }
```

## Advanced Usage

### Async Operations

For async operations, the modal will show a loading spinner and disable buttons:

```typescript
const handleAsyncAction = async () => {
  modalProps.title = 'Processing...'
  modalProps.message = 'This may take a few seconds.'

  currentAction.value = async () => {
    // The modal will automatically show loading state
    await fetch('/api/some-endpoint', { method: 'DELETE' })
    console.log('Operation completed!')
  }

  confirmModal.value?.show()
}
```

### Complete Implementation Example

```vue
<template>
  <div>
    <button @click="showDeleteConfirm">Delete Item</button>

    <ConfirmModal
      ref="confirmModal"
      :title="modalProps.title"
      :message="modalProps.message"
      :confirmText="modalProps.confirmText"
      :cancelText="modalProps.cancelText"
      :variant="modalProps.variant"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @close="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const confirmModal = ref()

const modalProps = reactive({
  title: 'Confirm Action',
  message: 'Are you sure you want to continue?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'info' as 'danger' | 'warning' | 'info' | 'success',
})

const currentAction = ref<(() => void | Promise<void>) | null>(null)

const showDeleteConfirm = () => {
  Object.assign(modalProps, {
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'danger',
  })
  currentAction.value = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Item deleted!')
  }
  confirmModal.value?.show()
}

const handleConfirm = async () => {
  if (currentAction.value) {
    try {
      await currentAction.value()
      confirmModal.value?.hide()
    } catch (error) {
      console.error('Action failed:', error)
      confirmModal.value?.setLoading(false)
    }
  }
}

const handleCancel = () => {
  currentAction.value = null
}
</script>
```

## Styling

The modal includes comprehensive CSS with:

- Smooth animations
- Dark mode support
- Responsive design
- Focus management
- Variant-specific colors

You can customize the styles by modifying the CSS variables or overriding specific classes.

## Accessibility

- Keyboard navigation (Enter to confirm, Escape to cancel)
- Focus trapping within the modal
- Proper ARIA attributes
- Screen reader friendly

## Related Files

- **Component**: `src/components/ConfirmModal.vue`
- **Composable**: `src/composables/useConfirmModal.ts`
- **Examples**: `src/components/examples/ConfirmModalExample.vue`
