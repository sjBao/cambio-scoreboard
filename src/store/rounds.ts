import { reactive } from 'vue'

export interface Round {
  roundId: string
  [key: string]: number | string // Player IDs as keys, values are scores
}
export const roundStore = reactive({
  rounds: [] as Round[],

  addRound(newRound: Round) {
    this.rounds.push(newRound)
  },

  updateRound(roundId: string, playerId: string, newValue: number) {
    const roundIndex = this.rounds.findIndex((round) => round.roundId === roundId)
    if (roundIndex !== -1) {
      this.rounds[roundIndex][playerId] = newValue
    }
  },

  resetRounds() {
    this.rounds = []
  },
})
