<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>Charts</h2>
        <button class="close-button" @click="closeModal" aria-label="Close charts modal">×</button>
      </div>

      <div class="modal-content">
        <div class="tabs">
          <button 
            class="tab-button" 
            :class="{ active: activeTab === 'flow' }" 
            @click="activeTab = 'flow'"
          >
            Score Flow
          </button>
          <button 
            class="tab-button" 
            :class="{ active: activeTab === 'distribution' }" 
            @click="activeTab = 'distribution'"
          >
            Round Distribution
          </button>
        </div>

        <div class="tab-content">
          <div v-if="activeTab === 'flow'" class="chart-wrapper">
            <ScoreFlowChart />
          </div>
          <div v-else class="chart-wrapper">
            <RoundDistributionChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScoreFlowChart from '../ScoreFlowChart.vue'
import RoundDistributionChart from '../RoundDistributionChart.vue'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const activeTab = ref<'flow' | 'distribution'>('flow')

const handleOverlayClick = (e: Event) => {
  const target = e.target as HTMLElement
  const currentTarget = e.currentTarget as HTMLElement
  if (target === currentTarget) {
    emit('close')
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background-color: var(--color-background);
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  color: var(--color-heading);
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-text);
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: var(--color-background-mute);
}

.modal-content {
  padding: 0;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border);
}

.tab-button {
  flex: 1;
  padding: 16px 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  background-color: var(--color-background-soft);
  color: var(--color-heading);
}

.tab-button.active {
  color: var(--color-heading);
  border-bottom-color: rgba(218, 165, 32, 1);
  background-color: var(--color-background-soft);
}

.tab-content {
  padding: 24px;
}

.chart-wrapper {
  height: 500px;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-height: 95vh;
    max-width: 100%;
  }

  .modal-header {
    padding: 16px 20px 12px;
  }

  .modal-header h2 {
    font-size: 1.3rem;
  }

  .tab-content {
    padding: 20px;
  }

  .chart-wrapper {
    height: 400px;
  }

  .tab-button {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
}
</style>