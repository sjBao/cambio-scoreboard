# Documentation Index

Welcome to the Cambio Scoreboard documentation!

## Components

### UI Components

- [ConfirmModal](./components/ConfirmModal.md) - A reusable confirmation modal component

## Guides

- [Component Development](./guides/component-development.md) - Guidelines for creating and maintaining components

## Examples

All components include live examples that you can run locally:

```bash
# Start the development server
npm run dev

# Navigate to the examples
# Visit: src/components/examples/
```

### Available Examples

- **ConfirmModalExample.vue** - Interactive demos of the ConfirmModal component

## Guides

### Development

- Component development guidelines (coming soon)
- Testing best practices (coming soon)
- Code style guide (coming soon)

### Project Structure

```
cambio-scoreboard/
├── docs/                        # Documentation
│   ├── components/              # Component documentation
│   ├── guides/                  # Development guides
│   └── README.md               # This file
├── src/
│   ├── components/             # Reusable UI components
│   │   └── examples/           # Component examples/demos
│   ├── composables/            # Reusable Vue composables
│   ├── store/                  # Pinia stores
│   └── views/                  # Page components
└── README.md                   # Project overview
```

## Contributing

When adding new components:

1. **Create the component** in `src/components/`
2. **Add documentation** in `docs/components/`
3. **Create examples** in `src/components/examples/`
4. **Update this index** to include your new component

## Quick Links

- [Project README](../README.md)
- [Component Examples](../src/components/examples/)
- [Live Examples (when dev server is running)](http://localhost:5173/examples)
