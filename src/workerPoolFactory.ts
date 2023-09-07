import path from 'path'

import workerpool, { WorkerPool } from 'workerpool'

export type WorkerSignature = () => void

export function workerPoolFactory (maxWorkers: number, maxQueueSize: number): WorkerPool {
  return workerpool.pool(path.join(__dirname, 'worker.ts'), {
    workerType: 'thread',
    maxWorkers,
    // @ts-ignore NOTE: This option is missing from DefinitelyTyped
    maxQueueSize
  })
}