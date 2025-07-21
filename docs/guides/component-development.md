# Component Development Guide

Guidelines for creating and maintaining components in the Cambio Scoreboard project.

## 📁 File Organization

### Component Structure

```
src/components/
├── ComponentName.vue           # Main component
└── examples/
    └── ComponentNameExample.vue # Usage examples
```

### Documentation Structure

```
docs/components/
└── ComponentName.md           # Component documentation
```

### Composables Structure

```
src/composables/
└── useComponentName.ts        # Reusable logic
```

## 🎯 Component Guidelines

### 1. Component Naming

- Use **PascalCase** for component files: `ConfirmModal.vue`
- Use **kebab-case** in templates: `<confirm-modal>`

### 2. Props Definition

```vue
<script setup lang="ts">
// ✅ Good - with TypeScript interface
interface Props {
  title?: string
  variant?: 'info' | 'warning' | 'danger' | 'success'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title',
  variant: 'info',
  disabled: false,
})
</script>
```

### 3. Events

```vue
<script setup lang="ts">
// ✅ Good - typed events
const emit = defineEmits<{
  confirm: []
  cancel: []
  change: [value: string]
}>()

// Emit events with descriptive names
const handleClick = () => {
  emit('confirm')
}
</script>
```

### 4. Exposed Methods

```vue
<script setup lang="ts">
// ✅ Good - expose useful methods
const show = () => {
  /* ... */
}
const hide = () => {
  /* ... */
}

defineExpose({
  show,
  hide,
})
</script>
```

## 📚 Documentation Template

When creating a new component, use this template for documentation:

```markdown
# ComponentName

Brief description of what the component does.

## Features

- 🎯 Feature 1
- ⚡ Feature 2
- 🎨 Feature 3

## Quick Start

\`\`\`vue
<template>
<ComponentName
prop1="value1"
@event="handler"
/>
</template>
\`\`\`

## Examples

📖 **Live Examples**: See `src/components/examples/ComponentNameExample.vue`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |

### Events

| Event | Description |
| ----- | ----------- |

### Methods

| Method | Description |
| ------ | ----------- |

## Related Files

- **Component**: `src/components/ComponentName.vue`
- **Examples**: `src/components/examples/ComponentNameExample.vue`
- **Composable**: `src/composables/useComponentName.ts` (if applicable)
```

## 🧪 Example Component Template

When creating examples, follow this pattern:

```vue
<template>
  <div>
    <h2>ComponentName Examples</h2>

    <!-- Example sections -->
    <div class="example-section">
      <h3>Basic Usage</h3>
      <ComponentName />
    </div>

    <div class="example-section">
      <h3>With Props</h3>
      <ComponentName :prop="value" />
    </div>

    <div class="example-section">
      <h3>Interactive Example</h3>
      <button @click="showDemo">Show Demo</button>
      <ComponentName v-if="showModal" @confirm="handleConfirm" @cancel="showModal = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ComponentName from '@/components/ComponentName.vue'

const showModal = ref(false)

const showDemo = () => {
  showModal.value = true
}

const handleConfirm = () => {
  console.log('Confirmed!')
  showModal.value = false
}
</script>

<style scoped>
.example-section {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.example-section h3 {
  margin-top: 0;
  color: #374151;
}
</style>
```

## ✅ Checklist for New Components

When creating a new component:

- [ ] Component file created in `src/components/`
- [ ] Props properly typed with TypeScript
- [ ] Events properly defined and emitted
- [ ] Useful methods exposed via `defineExpose`
- [ ] Example file created in `src/components/examples/`
- [ ] Documentation created in `docs/components/`
- [ ] Documentation index updated in `docs/README.md`
- [ ] Tests written (when applicable)
- [ ] Composable created in `src/composables/` (if reusable logic)

## 🎨 Styling Guidelines

- Use **scoped styles** by default
- Follow existing color scheme and spacing
- Support dark mode when possible
- Use CSS custom properties for theming
- Keep animations smooth and accessible

```vue
<style scoped>
.component {
  /* Use consistent spacing */
  padding: var(--spacing-md, 1rem);

  /* Support dark mode */
  background: var(--bg-primary);
  color: var(--text-primary);

  /* Smooth transitions */
  transition: all 0.2s ease;
}
</style>
```

This guide ensures consistency and maintainability across all components in the project.
