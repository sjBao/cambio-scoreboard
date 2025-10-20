import { reactive, watch } from 'vue'
import { roundsIndexedDBService } from '@/services/storage'
import { playerStore } from './players'

export interface Round {
  roundId: string
  [key: string]: number | string // Player IDs as keys, values are scores
}

export const roundStore = reactive({
  rounds: [{ roundId: 'round1', player1: 0, player2: 0, player3: 0, player4: 0 }] as Round[],
  isLoaded: false,

  async initializeFromStorage() {
    try {
      const storedRounds = await roundsIndexedDBService.loadRounds()
      if (storedRounds?.length === 0) {
        this.resetRounds()
      } else {
        this.rounds = storedRounds
      }
      this.isLoaded = true
    } catch (error) {
      console.error('Failed to load rounds from IndexedDB:', error)
      this.isLoaded = true // Still mark as loaded even if there was an error
    }
  },

  async saveToStorage() {
    try {
      await roundsIndexedDBService.saveRounds(this.rounds)
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
    try {
      await roundsIndexedDBService.clearRounds()
      const newRound: Round = { roundId: "round1" }
      for (const player of playerStore.players) {
        newRound[player.id] = 0
      }
      roundStore.addRound(newRound)
      this.rounds = [newRound]
    } catch (error) {
      console.error('Failed to clear rounds:', error)
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
