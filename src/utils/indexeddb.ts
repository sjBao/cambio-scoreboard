// IndexedDB utility for persisting application data
const DB_NAME = 'CambioScoreboardDB'
const DB_VERSION = 1
const ROUNDS_STORE = 'rounds'
const PLAYERS_STORE = 'players'

export interface StoredRound {
  roundId: string
  [key: string]: number | string // Player IDs as keys, values are scores
}

export interface StoredPlayer {
  id: string
  name?: string
}

class IndexedDBService {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create rounds object store if it doesn't exist
        if (!db.objectStoreNames.contains(ROUNDS_STORE)) {
          db.createObjectStore(ROUNDS_STORE, { keyPath: 'roundId' })
          console.log('Created rounds object store')
        }

        // Create players object store if it doesn't exist
        if (!db.objectStoreNames.contains(PLAYERS_STORE)) {
          db.createObjectStore(PLAYERS_STORE, { keyPath: 'id' })
          console.log('Created players object store')
        }
      }
    })
  }

  async saveRounds(rounds: StoredRound[]): Promise<void> {
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ROUNDS_STORE], 'readwrite')
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
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ROUNDS_STORE], 'readonly')
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
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([ROUNDS_STORE], 'readwrite')
      const store = transaction.objectStore(ROUNDS_STORE)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async savePlayers(players: StoredPlayer[]): Promise<void> {
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PLAYERS_STORE], 'readwrite')
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
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PLAYERS_STORE], 'readonly')
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
    if (!this.db) {
      await this.init()
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([PLAYERS_STORE], 'readwrite')
      const store = transaction.objectStore(PLAYERS_STORE)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

export const indexedDBService = new IndexedDBService()
