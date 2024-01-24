import * as console from 'console'
import { env } from '@main/config/enviroment'
import setupDash from '@main/dashboard/app'

interface Message {
  IssuerID: string,
  FileBase64: string,
  Status: string
}

async function start (): Promise<void> {
  const { setupBull } = await import('@main/bull/client')
  const receiveQueue = await setupBull()
  console.log(`Start consumer`)

  setupDash(receiveQueue)

  // https://github.com/OptimalBits/bull/blob/v4.12.2/REFERENCE.md#queueprocess
  await receiveQueue.process(env.bullQueueJobFile, 10,function (job, done) {

    console.log(`QueueName: ${job.queue.name}\nJobID: ${job.id}\nJobName: ${job.name}`)
    console.log(`Received message: `, job.data)

    const msg: Message = job.data

    // msg.Status = "Completed"
    if (msg.Status === 'Completed') {
      done()
    }
  })
}

start().catch(console.log)
