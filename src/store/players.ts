import { reactive } from 'vue'

interface Player {
  id: string
  name?: string
}

export const playerStore = reactive({
  players: [
    { id: 'player1', name: 'Player 1' },
    { id: 'player2', name: 'Player 2' },
    { id: 'player3', name: 'Player 3' },
    { id: 'player4', name: 'Player 4' },
  ] as Player[],

  minPlayers: 2,
  maxPlayers: 6,

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
})
