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
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(-90deg, rgb(218, 165, 32) 33%, rgb(255, 255, 255, 0.9) 96%);
  color: transparent;
  font-size: 2.6rem;
  font-weight: 500;
  position: relative;
  top: -10px;
}

.greetings {
  display: flex;
  justify-content: center;
}
</style>
