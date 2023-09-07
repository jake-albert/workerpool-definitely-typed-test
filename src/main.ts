import yargs from 'yargs'

import { WorkerSignature, workerPoolFactory } from "./workerPoolFactory"
import { WorkerPool } from 'workerpool'

async function main(workerPool: WorkerPool, totalJobs: number): Promise<void> {
  const startTime = Date.now()

  console.log(`Launching ${totalJobs} jobs simultaneously...`)
  await Promise.all(Array.from(
    { length: totalJobs },
    (_, k) => new Promise<void>(async (resolve, reject) => {
        try {
          await workerPool.exec<WorkerSignature>('work', [])
          const duration =(Date.now() - startTime) / 1000
          console.log(`[DONE] ${k}: T+${duration}s`)
          resolve()
        } catch (error: any) {
          if (!/Max queue size of/.test(error.message)) {
            reject(error) 
          }
          console.warn(`[WARN] ${k}: Could not fit onto queue: ${error.message}`)
          resolve()
        }
    })
  ))
}

const parser = yargs(process.argv.slice(2)).options({
    totalJobs: { type: 'number', demandOption: true, alias: 't' },
    maxWorkers: { type: 'number', demandOption: true, alias: 'w' },
    maxQueueSize: { type: 'number', demandOption: true, alias: 'q' },
  })

;(async () => {
    try {
        const { totalJobs, maxWorkers, maxQueueSize } = await parser.argv
        const workerPool = workerPoolFactory(maxWorkers, maxQueueSize)
        await main(workerPool, totalJobs)
        process.exit(0)
    } catch (error) {
        console.error(`Failed: ${error}`)
        process.exit(1)
    }
})()