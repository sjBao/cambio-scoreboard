// IndexedDB persistence for players data
import { dbService, PLAYERS_STORE } from './indexedDBCore'

export interface StoredPlayer {
  id: string
  name?: string
}

class PlayersIndexedDBService {
  async savePlayers(players: StoredPlayer[]): Promise<void> {
    const db = await dbService.getDatabase()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PLAYERS_STORE], 'readwrite')
      const store = transaction.objectStore(PLAYERS_STORE)

      // Clear existing data first
      const clearRequest = store.clear()

      clearRequest.onsuccess = () => {
        // Add all players
        const promises = players.map((player) => {
          return new Promise<void>((resolveAdd, rejectAdd) => {
            const addRequest = store.add({ ...player })
            addRequest.onsuccess = () => resolveAdd()
            addRequest.onerror = () => rejectAdd(addRequest.error)
          })
        })

        Promise.all(promises)
          .then(() => resolve())
          .catch(reject)
      }

      clearRequest.onerror = () => reject(clearRequest.error)
    })
  }

  async loadPlayers(): Promise<StoredPlayer[]> {
    const db = await dbService.getDatabase()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PLAYERS_STORE], 'readonly')
      const store = transaction.objectStore(PLAYERS_STORE)
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        console.error('Failed to load players from IndexedDB:', request.error)
        reject(request.error)
      }
    })
  }

  async clearPlayers(): Promise<void> {
    const db = await dbService.getDatabase()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([PLAYERS_STORE], 'readwrite')
      const store = transaction.objectStore(PLAYERS_STORE)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

export const playersIndexedDBService = new PlayersIndexedDBService()
