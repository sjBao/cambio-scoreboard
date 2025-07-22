<script setup lang="ts">
import { ref } from 'vue'
import CambioLogo from './components/CambioLogo.vue'
import ScoreboardTable from './components/ScoreboardTable.vue'
import ScoreFlowChart from './components/ScoreFlowChart.vue'
import RoundDistributionChart from './components/RoundDistributionChart.vue'
import HelpButton from './components/HelpButton/HelpButton.vue'
import HelpModal from './components/HelpModal/HelpModal.vue'

const isHelpModalOpen = ref(false)

const openHelpModal = () => {
  isHelpModalOpen.value = true
}

const closeHelpModal = () => {
  isHelpModalOpen.value = false
}
</script>

<template>
  <header>
    <div class="wrapper">
      <CambioLogo msg="CAMBIO" />
      <HelpButton @click="openHelpModal" />
    </div>
  </header>

  <main>
    <ScoreboardTable />
    
    <div class="charts-section">
      <div class="chart-grid">
        <ScoreFlowChart />
        <RoundDistributionChart />
      </div>
    </div>
  </main>

  <!-- Help Modal -->
  <HelpModal :isOpen="isHelpModalOpen" @close="closeHelpModal" />
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

.charts-section {
  margin-top: 2rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .chart-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  main {
    padding: 0 16px;
  }
  
  .charts-section {
    margin-top: 1.5rem;
  }
  
  .chart-grid {
    gap: 1.5rem;
  }
}
</style>
