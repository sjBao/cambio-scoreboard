<script setup lang="ts">
import { ref } from 'vue'
import CambioLogo from './components/CambioLogo.vue'
import ScoreboardTable from './components/ScoreboardTable.vue'
import HelpButton from './components/HelpButton/HelpButton.vue'
import HelpModal from './components/HelpModal/HelpModal.vue'
import ChartsButton from './components/ChartsButton/ChartsButton.vue'
import ChartsModal from './components/ChartsModal/ChartsModal.vue'

const isHelpModalOpen = ref(false)
const isChartsModalOpen = ref(false)

const openHelpModal = () => {
  isHelpModalOpen.value = true
}

const closeHelpModal = () => {
  isHelpModalOpen.value = false
}

const openChartsModal = () => {
  isChartsModalOpen.value = true
}

const closeChartsModal = () => {
  isChartsModalOpen.value = false
}
</script>

<template>
  <header>
    <div class="wrapper">
      <CambioLogo msg="CAMBIO" />
      <div class="header-buttons">
        <ChartsButton @click="openChartsModal" />
        <HelpButton @click="openHelpModal" />
      </div>
    </div>
  </header>

  <main>
    <ScoreboardTable />
  </main>

  <!-- Help Modal -->
  <HelpModal :isOpen="isHelpModalOpen" @close="closeHelpModal" />
  
  <!-- Charts Modal -->
  <ChartsModal :isOpen="isChartsModalOpen" @close="closeChartsModal" />
</template>

<style scoped>
header {
  line-height: 1.5;
  padding: 20px 0;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.logo {
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .wrapper {
    padding: 0 16px;
  }

  header {
    padding: 16px 0;
  }
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 640px) {
  main {
    padding: 0 16px;
  }
}
</style>
