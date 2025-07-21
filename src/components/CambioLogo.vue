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
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* Fallback for very old browsers */
  color: transparent;

  font-size: 2.6rem;
  font-weight: 500;
  position: relative;
  top: -10px;
}

/* iOS-specific override */
@supports (-webkit-touch-callout: none) {
  h1 {
    /* Force solid colors for iOS if gradient fails */
    background: linear-gradient(
      to right,
      #b8860b 0%,
      #daa520 25%,
      #f0e68c 50%,
      #ffffff 75%,
      #ffffff 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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
