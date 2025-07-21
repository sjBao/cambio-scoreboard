<template>
  <button
    class="help-button"
    @click="$emit('click')"
    :title="title"
    aria-label="Open help information"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  </button>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Get help with card powers',
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.help-button {
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

.help-button:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
  color: var(--color-heading);
  transform: scale(1.05);
}

.help-button:active {
  transform: scale(0.95);
}

.help-button:focus {
  outline: 2px solid rgba(218, 165, 32, 0.5);
  outline-offset: 2px;
}

.help-button svg {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.help-button:hover svg {
  transform: scale(1.1);
}

/* Alternative smaller size */
.help-button.small {
  width: 32px;
  height: 32px;
}

.help-button.small svg {
  width: 16px;
  height: 16px;
}
</style>
