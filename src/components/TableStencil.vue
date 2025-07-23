<script setup lang="ts">
interface Props {
  /** Number of data columns to show in the stencil */
  columnCount?: number
  /** Number of data rows to show in the stencil */
  rowCount?: number
}

withDefaults(defineProps<Props>(), {
  columnCount: 3,
  rowCount: 4,
})
</script>

<template>
  <div class="loading-stencil">
    <!-- Stencil header row -->
    <div class="stencil-header">
      <div class="stencil-cell stencil-round-column">
        <div class="stencil-shimmer"></div>
      </div>
      <div 
        v-for="i in columnCount" 
        :key="`header-${i}`" 
        class="stencil-cell stencil-player-column"
      >
        <div class="stencil-shimmer"></div>
      </div>
    </div>
    
    <!-- Stencil totals row -->
    <div class="stencil-row stencil-totals-row">
      <div class="stencil-cell stencil-round-column">
        <div class="stencil-shimmer"></div>
      </div>
      <div 
        v-for="i in columnCount" 
        :key="`totals-${i}`" 
        class="stencil-cell stencil-player-column"
      >
        <div class="stencil-shimmer"></div>
      </div>
    </div>
    
    <!-- Stencil data rows -->
    <div 
      v-for="row in rowCount" 
      :key="`row-${row}`" 
      class="stencil-row"
    >
      <div class="stencil-cell stencil-round-column">
        <div class="stencil-shimmer"></div>
      </div>
      <div 
        v-for="i in columnCount" 
        :key="`row-${row}-col-${i}`" 
        class="stencil-cell stencil-player-column"
      >
        <div class="stencil-shimmer"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-stencil {
  border: 1px solid #374151;
  border-radius: 4px;
  overflow: hidden;
  background: #1f2937;
}

.stencil-header {
  display: flex;
  background: #2d3748;
  border-bottom: 2px solid #374151;
}

.stencil-row {
  display: flex;
  border-bottom: 1px solid #374151;
}

.stencil-totals-row {
  background: #2d3748;
  border-bottom: 2px solid #374151;
}

.stencil-cell {
  border-right: 1px solid #374151;
  padding: 8px 12px;
  min-height: 40px;
  display: flex;
  align-items: center;
}

.stencil-round-column {
  width: 110px;
  flex-shrink: 0;
}

.stencil-player-column {
  width: 120px;
  flex-shrink: 0;
}

.stencil-shimmer {
  width: 100%;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
