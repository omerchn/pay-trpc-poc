import cors from 'cors'
import logger from '@pay-com/logger'
import express, { type Application } from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { renderTrpcPanel } from 'trpc-panel'
import { createContext, productionAuth, localAuth } from './src/context'
import { appRouter } from './src/routes/app-router'
import { IS_PROD, PORT } from './src/consts'
const { healthCheckGrpcDependancies } = require('@pay-com/grpc-tools/libs')

const getAuthCtx = IS_PROD ? productionAuth : localAuth

const bootstrap = async (app: Application) => {
  await healthCheckGrpcDependancies()

  if (!PORT) {
    logger.error('missing port, unable to start express server')
    return process.exit(1)
  }

  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: createContext(getAuthCtx)
    })
  )

  if (!IS_PROD) {
    app.use('/panel', (_, res) => {
      return res.send(renderTrpcPanel(appRouter, { url: '/trpc' }))
    })
  }

  app.listen(PORT, () => {
    logger.info(`api started on port ${PORT}`)
    if (!IS_PROD) {
      logger.info(`api panel: http://localhost:${PORT}/panel`)
    }
  })
}

const app = express()
app.use(express.json())
app.use(cors())

bootstrap(app)

process.on('SIGINT', () => {
  process.exit()
})
