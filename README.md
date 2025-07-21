# Cambio Scoreboard

This is v2 of the cambio scoreboard built using Vue 3, featuring a modern component-based architecture with reusable UI components.

## 📚 Documentation

- **[Component Documentation](./docs/README.md)** - Detailed component APIs and usage guides
- **[ConfirmModal Component](./docs/components/ConfirmModal.md)** - Reusable confirmation modal
- **[Live Examples](./src/components/examples/)** - Interactive component demos

## 🚀 Quick Start

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev

# View component examples at /examples route
```

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ConfirmModal.vue
│   └── examples/         # Component examples
├── composables/          # Reusable Vue composables
├── store/               # Pinia stores (players, rounds)
└── views/               # Page components
```

### Key Features

- **🎯 TypeScript** - Full type safety
- **🎨 Component Library** - Reusable UI components with documentation
- **⚡ Vue 3 Composition API** - Modern reactive patterns
- **🗃️ Pinia State Management** - Reactive game state
- **📊 AG Grid** - Advanced data table for scores

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## 🧩 Components

### Available Components

- **ConfirmModal** - Generic confirmation dialog with multiple variants
- **ScoreboardTable** - Interactive scoring table with real-time updates

### Using Components

```vue
<template>
  <!-- Confirmation Modal -->
  <ConfirmModal
    title="Delete Player"
    message="Are you sure?"
    variant="danger"
    @confirm="handleDelete"
  />
</template>

<script setup lang="ts">
import ConfirmModal from '@/components/ConfirmModal.vue'
import { confirmDelete } from '@/composables/useConfirmModal'

// Use helper functions for common patterns
const deleteProps = confirmDelete('Player 1')
</script>
```

See [Component Documentation](./docs/README.md) for detailed usage guides and examples.

## 📖 Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia State Management](https://pinia.vuejs.org/)
- [AG Grid Vue](https://ag-grid.com/vue-data-grid/)
- [Vite Build Tool](https://vite.dev/)
