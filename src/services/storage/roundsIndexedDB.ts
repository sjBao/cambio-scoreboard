// IndexedDB persistence for rounds data
import { dbService, ROUNDS_STORE } from './indexedDBCore'

export interface StoredRound {
  roundId: string
  [key: string]: number | string // Player IDs as keys, values are scores
}

class RoundsIndexedDBService {
  async saveRounds(rounds: StoredRound[]): Promise<void> {
    const db = await dbService.getDatabase()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ROUNDS_STORE], 'readwrite')
      const store = transaction.objectStore(ROUNDS_STORE)

      // Clear existing data first
      const clearRequest = store.clear()

      clearRequest.onsuccess = () => {
        // Add all rounds
        const promises = rounds.map((round) => {
          return new Promise<void>((resolveAdd, rejectAdd) => {
            const addRequest = store.add({ ...round })
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

  async loadRounds(): Promise<StoredRound[]> {
    const db = await dbService.getDatabase()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ROUNDS_STORE], 'readonly')
      const store = transaction.objectStore(ROUNDS_STORE)
      const request = store.getAll()

      request.onsuccess = () => {
        resolve(request.result || [])
      }

      request.onerror = () => {
        console.error('Failed to load rounds from IndexedDB:', request.error)
        reject(request.error)
      }
    })
  }

  async clearRounds(): Promise<void> {
    const db = await dbService.getDatabase()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([ROUNDS_STORE], 'readwrite')
      const store = transaction.objectStore(ROUNDS_STORE)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

export const roundsIndexedDBService = new RoundsIndexedDBService()
