import { initializeDatabase } from './data/data'
import { launchAPI } from './api/api'
import config from './config'

console.log(`Starting Amala app: ${config.appName}`)

async function main() {
  try {
    await initializeDatabase()
    await launchAPI()
  } catch (err) {
    console.error('[Launch Error] Could not start Service: ', err)
  }
}

main()
