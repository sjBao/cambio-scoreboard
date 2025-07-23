import { reactive, watch } from 'vue'
import { playersIndexedDBService } from '@/services/storage'

export interface Player {
  id: string
  name?: string
}

// Default players to use if no saved data exists
const defaultPlayers: Player[] = [
  { id: 'player1', name: 'Player 1' },
  { id: 'player2', name: 'Player 2' },
  { id: 'player3', name: 'Player 3' },
  { id: 'player4', name: 'Player 4' },
]

export const playerStore = reactive({
  players: [...defaultPlayers] as Player[],
  isLoaded: false,

  minPlayers: 2,
  maxPlayers: 6,

  async initializeFromStorage() {
    try {
      const storedPlayers = await playersIndexedDBService.loadPlayers()
      if (storedPlayers.length > 0) {
        this.players = storedPlayers
      } else {
        // No saved players, use defaults and save them
        this.players = [...defaultPlayers]
        await this.saveToStorage()
      }
      this.isLoaded = true
    } catch (error) {
      console.error('Failed to load players from IndexedDB:', error)
      this.players = [...defaultPlayers]
      this.isLoaded = true // Still mark as loaded even if there was an error
    }
  },

  async saveToStorage() {
    try {
      await playersIndexedDBService.savePlayers(this.players)
    } catch (error) {
      console.error('Failed to save players to IndexedDB:', error)
    }
  },

  addPlayer(newPlayer: Player) {
    if (this.players.length >= this.maxPlayers) {
      console.warn(`Cannot add more than ${this.maxPlayers} players.`)
      return
    }

    this.players.push(newPlayer)
  },

  removePlayer(playerId: string) {
    if (this.players.length <= this.minPlayers) {
      console.warn(`Cannot remove player. Minimum of ${this.minPlayers} players required.`)
      return
    }

    const playerIndex = this.players.findIndex((p) => p.id === playerId)
    if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1)
    }
  },

  updatePlayerName(playerId: string, newName: string) {
    const playerIndex = this.players.findIndex((p) => p.id === playerId)
    if (playerIndex !== -1) {
      this.players[playerIndex].name = newName
    }
  },

  async resetToDefaults() {
    this.players = [...defaultPlayers]
    try {
      await playersIndexedDBService.clearPlayers()
      await this.saveToStorage()
    } catch (error) {
      console.error('Failed to reset players:', error)
    }
  },
})

// Auto-save to IndexedDB whenever players change
watch(
  () => playerStore.players,
  () => {
    if (playerStore.isLoaded) {
      playerStore.saveToStorage()
    }
  },
  { deep: true },
)

// Initialize from storage when the store is created
playerStore.initializeFromStorage()
