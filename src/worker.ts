const workerpool = require('workerpool')

const WORKER_MILLISECONDS = 3_000

async function work() {
  // Simulate some work being done...
  await new Promise((resolve) => setTimeout(resolve, WORKER_MILLISECONDS))
}

workerpool.worker({ work })
