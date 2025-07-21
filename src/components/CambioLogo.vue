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

  /* Gradient text effect */
  background-image: linear-gradient(-90deg, #daa520 33%, #ffffff 96%);
  -webkit-background-clip: text;
  background-clip: text;

  /* Use -webkit-text-fill-color instead of color: transparent for better iOS support */
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-size: 2.6rem;
  font-weight: 500;
  position: relative;
  top: -10px;
}

/* Additional iOS Safari fix */
@supports (-webkit-background-clip: text) {
  h1 {
    -webkit-text-fill-color: transparent;
  }
}

.greetings {
  display: flex;
  justify-content: flex-start;
}
</style>
