<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { playerStore } from '@/store/players'
import { roundStore } from '@/store/rounds'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const playerColors = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 205, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
]

const borderColors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
]

const chartData = computed(() => {
  const labels = playerStore.players.map((player) => player.name || player.id)

  // Calculate average scores
  const averageData = playerStore.players.map((player) => {
    const scores = roundStore.rounds.map((round) => Number(round[player.id] || 0))
    const sum = scores.reduce((acc, score) => acc + score, 0)
    return scores.length > 0 ? sum / scores.length : 0
  })

  const datasets = [{
    label: 'Average Scores',
    data: averageData,
    backgroundColor: playerStore.players.map((_, index) => playerColors[index % playerColors.length]),
    borderColor: playerStore.players.map((_, index) => borderColors[index % borderColors.length]),
    borderWidth: 1,
  }]

  return {
    labels,
    datasets,
  }
})

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Average Scores',
      color: '#ffffff',
    },
    legend: {
      labels: {
        color: '#ffffff',
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Player',
        color: '#ffffff',
      },
      ticks: {
        color: '#ffffff',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Average Scores',
        color: '#ffffff',
      },
      ticks: {
        color: '#ffffff',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
}
</script>

<template>
  <div class="chart-container">
    <Bar v-if="roundStore.rounds.length > 0" :data="chartData" :options="chartOptions" />
    <div v-else class="no-data">No rounds available to display</div>
  </div>
</template>

<style scoped>
.chart-container {
  height: 400px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 10px;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #9ca3af;
  font-size: 1.1rem;
}
</style>
