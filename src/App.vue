<script setup lang="ts">
import CambioLogo from './components/CambioLogo.vue'
import ScoreboardTable from './components/ScoreboardTable.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <CambioLogo msg="CAMBIO" />
    </div>
  </header>

  <main>
    <ScoreboardTable />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    display: block;
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    flex-wrap: wrap;
  }
}
</style>
