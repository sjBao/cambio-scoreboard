// Core IndexedDB initialization and configuration
export const DB_NAME = 'CambioScoreboardDB'
export const DB_VERSION = 1
export const ROUNDS_STORE = 'rounds'
export const PLAYERS_STORE = 'players'

class DatabaseService {
  private db: IDBDatabase | null = null

  async getDatabase(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error)
        reject(request.error)
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create rounds object store if it doesn't exist
        if (!db.objectStoreNames.contains(ROUNDS_STORE)) {
          db.createObjectStore(ROUNDS_STORE, { keyPath: 'roundId' })
        }

        // Create players object store if it doesn't exist
        if (!db.objectStoreNames.contains(PLAYERS_STORE)) {
          db.createObjectStore(PLAYERS_STORE, { keyPath: 'id' })
        }
      }
    })
  }
}

export const dbService = new DatabaseService()
