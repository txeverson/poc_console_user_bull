import { env } from '@main/config/enviroment'
import console from 'console'
import { Job } from 'bull'

interface Message {
  IssuerID: string,
  FileBase64: string,
  Status: string
}

async function start (): Promise<Job> {
  const { setupBull } = await import('@main/bull/client')
  const sendQueue = await setupBull()
  console.log(`Start producer`)

  let message: Message = {
    IssuerID: '1',
    FileBase64: 'FileInBase64',
    Status: 'Pending',
  }

  return await sendQueue.add(env.bullQueueJobFile, message)
}

start().then((job) => {
  console.log(`QueueName: ${job.queue.name}\nJobID: ${job.id}\nJobName: ${job.name}`)
  console.log(`IssuerID: ${job.data['IssuerID']}`)
}).catch(console.log)
