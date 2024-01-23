import * as console from 'console'
import { env } from '@main/config/enviroment'

async function start (): Promise<void> {
  const { setupBull } = await import('@main/bull/client')
  const receiveQueue = await setupBull()
  console.log(`Start consumer`)

  await receiveQueue.process(env.bullQueueJobFile, function (job, done) {

    console.log(`QueueName: ${job.queue.name}\nJobID: ${job.id}\nJobName: ${job.name}`)
    console.log(`Received message: `, job.data)

    done()
    job.isCompleted().then((completed) => {
      if (completed) {
        job.remove()
      } else {
        // job.retry()
      }
    })
  })
}

start().catch(console.log)
