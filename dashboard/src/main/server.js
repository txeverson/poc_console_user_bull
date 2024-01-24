const express = require('express')
const Queue = require('bull')
const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')

const someQueue = new Queue('files', {
  redis: {
    port: 6379,
    host: 'localhost',
  },
  prefix: 'bullConsole'
})

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

const {
  addQueue,
  removeQueue,
  setQueues,
  replaceQueues
} = createBullBoard({
  queues: [new BullAdapter(someQueue, { readOnlyMode: true })],
  serverAdapter: serverAdapter,
})

const app = express()

app.use('/admin/queues', serverAdapter.getRouter())

// other configurations of your server

app.listen(3000, () => {
  console.log('Running on 3000...')
  console.log('For the UI, open http://localhost:3000/admin/queues')
  console.log('Make sure Redis is running on port 6379 by default')
})
