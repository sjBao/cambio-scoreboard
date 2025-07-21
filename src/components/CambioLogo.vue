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
  color: #daa520;

  /* Gradient text effect with more explicit iOS handling */
  background: linear-gradient(-90deg, #daa520 0%, #daa520 33%, #ffffff 96%, #ffffff 100%);
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
  position: relative;
  top: -10px;
}

/* Fallback for browsers that don't support background-clip at all */
@supports not (-webkit-background-clip: text) {
  h1 {
    background: none;
    color: #daa520;
    -webkit-text-fill-color: #daa520;
  }
}

.greetings {
  display: flex;
  justify-content: flex-start;
}
</style>
