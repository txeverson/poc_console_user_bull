import { Queue } from 'bull'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import express from 'express'
import console from 'console'

export default (queue: Queue): void => {
  const basePath = '/'

  // https://github.com/felixmosh/bull-board
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath(basePath)

  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter: serverAdapter,
    options: {
      uiConfig: {
        boardTitle: 'Console',
        miscLinks: [{
          text: 'Logout',
          url: '/logout'
        }],

      },
    },
  })

  const app = express()
  app.use(basePath, serverAdapter.getRouter())

  app.listen(3000, () => {
    console.log(`For the UI, open http://localhost:3000${basePath}`)
  })
}
