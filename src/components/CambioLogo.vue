<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  /* Fallback color for browsers that don't support background-clip */
  color: rgba(218, 165, 32, 1);

  /* Gradient text effect with more explicit iOS handling */
  background: linear-gradient(
    -90deg,
    rgba(218, 165, 32, 1) 0%,
    rgba(218, 165, 32, 1) 33%,
    rgba(255, 255, 255, 1) 96%,
    rgba(255, 255, 255, 1) 100%
  );
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;

  /* iOS Safari specific fixes */
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(0, 0, 0, 0); /* Transparent text fill */
  background-clip: text;

  /* Fallback for very old browsers */
  color: rgba(0, 0, 0, 0); /* Transparent text fill */

  font-size: 2.6rem;
  font-weight: 500;
}

/* Fallback for browsers that don't support background-clip at all */
@supports not (-webkit-background-clip: text) {
  h1 {
    background: none;
    color: rgba(218, 165, 32, 1);
    -webkit-text-fill-color: rgba(218, 165, 32, 1);
  }
}

.greetings {
  display: flex;
  justify-content: flex-start;
}
</style>
