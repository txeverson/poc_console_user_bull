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
    IssuerID: '3',
    FileBase64: 'FileInBase64',
    Status: 'Pending',
  }

  // https://github.com/OptimalBits/bull/blob/v4.12.2/REFERENCE.md#queueadd
  const JobOpts = {
    removeOnComplete: true, // Remove quando for concluída com sucesso
    attempts: 100, // Quantidades de tentativas caso falha
    // delay: 10000, // Tempo em milissegundos para o evento ser processado
    backoff: { // Configurações para retentativas
      type: 'fixed',
      delay: 10000, // Tempo para realizar uma nova tentativa
    }
  }
  return await sendQueue.add(env.bullQueueJobFile, message, JobOpts)
}

start().then((job) => {
  console.log(`QueueName: ${job.queue.name}\nJobID: ${job.id}\nJobName: ${job.name}`)
  console.log(`IssuerID: ${job.data['IssuerID']}`)
}).catch(console.log)
