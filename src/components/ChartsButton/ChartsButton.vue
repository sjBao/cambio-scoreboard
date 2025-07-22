<template>
  <button
    class="charts-button"
    @click="$emit('click')"
    :title="title"
    aria-label="Open charts modal"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="13" width="4" height="8" rx="1" stroke="currentColor" stroke-width="2" />
      <rect x="10" y="9" width="4" height="12" rx="1" stroke="currentColor" stroke-width="2" />
      <rect x="17" y="5" width="4" height="16" rx="1" stroke="currentColor" stroke-width="2" />
    </svg>
  </button>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'View score charts',
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.charts-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.charts-button:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
  color: var(--color-heading);
  transform: scale(1.05);
}

.charts-button:active {
  transform: scale(0.95);
}

.charts-button:focus {
  outline: 2px solid rgba(218, 165, 32, 0.5);
  outline-offset: 2px;
}

.charts-button svg {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.charts-button:hover svg {
  transform: scale(1.1);
}

/* Alternative smaller size */
.charts-button.small {
  width: 32px;
  height: 32px;
}

.charts-button.small svg {
  width: 16px;
  height: 16px;
}
</style>