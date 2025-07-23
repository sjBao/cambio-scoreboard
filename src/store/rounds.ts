import { reactive, watch } from 'vue'
import { indexedDBService } from '@/utils/indexeddb'

export interface Round {
  roundId: string
  [key: string]: number | string // Player IDs as keys, values are scores
}

export const roundStore = reactive({
  rounds: [] as Round[],
  isLoaded: false,

  async initializeFromStorage() {
    try {
      const storedRounds = await indexedDBService.loadRounds()
      this.rounds = storedRounds
      this.isLoaded = true
      console.log('Loaded rounds from IndexedDB:', storedRounds.length, 'rounds')
    } catch (error) {
      console.error('Failed to load rounds from IndexedDB:', error)
      this.isLoaded = true // Still mark as loaded even if there was an error
    }
  },

  async saveToStorage() {
    try {
      await indexedDBService.saveRounds(this.rounds)
      console.log('Saved rounds to IndexedDB:', this.rounds.length, 'rounds')
    } catch (error) {
      console.error('Failed to save rounds to IndexedDB:', error)
    }
  },

  addRound(newRound: Round) {
    this.rounds.push(newRound)
  },

  updateRound(roundId: string, playerId: string, newValue: number) {
    const roundIndex = this.rounds.findIndex((round) => round.roundId === roundId)
    if (roundIndex !== -1) {
      this.rounds[roundIndex][playerId] = newValue
    }
  },

  async resetRounds() {
    this.rounds = []
    try {
      await indexedDBService.clearRounds()
      console.log('Cleared rounds from IndexedDB')
    } catch (error) {
      console.error('Failed to clear rounds from IndexedDB:', error)
    }
  },
})

// Auto-save to IndexedDB whenever rounds change
watch(
  () => roundStore.rounds,
  () => {
    if (roundStore.isLoaded) {
      roundStore.saveToStorage()
    }
  },
  { deep: true },
)

// Initialize from storage when the store is created
roundStore.initializeFromStorage()
