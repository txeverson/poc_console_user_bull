import { env } from '@main/config/enviroment'
import console from 'console'
import { Job } from 'bull'
import express, { Express } from 'express'

import { Queue } from 'bull'

interface Message {
  IssuerID: string,
  FileBase64: string,
  Status: string
}

const app = express()
app.use(express.json())

async function routes (queue: Queue): Promise<Express> {

  app.get('/queue/send', (req, res) => {

    let data: Message = {
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

    queue.add(env.bullQueueJobFile, data, JobOpts)
      .then((job) => {
        console.log(`QueueName: ${job.queue.name}\nJobID: ${job.id}\nJobName: ${job.name}`)
        console.log(`IssuerID: ${job.data['IssuerID']}`)
      })
      .catch(console.log)

    res.send({ response: 'Mensagem enviada com sucesso!' })
  })

  return app
}

async function main () {
  const { setupBull } = await import('@main/bull/client')
  const sendQueue = await setupBull()
  console.log(`Start producer`)

  const route = await routes(sendQueue)

  route.listen(3001, () => {
    console.log(`For the UI, open http://localhost:3001/queue/send`)
  })
}

main()
