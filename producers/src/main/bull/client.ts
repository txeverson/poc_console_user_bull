import SendQueue, { Queue } from 'bull'
import { env } from '@main/config/enviroment'

export const setupBull = async (): Promise<Queue> => {
  const opts = {
    redis: {
      host: env.redisHost,
      port: env.redisPort,
    },
    prefix: env.bullPrefix,
  }

  return new SendQueue(env.bullQueue, opts)

}
