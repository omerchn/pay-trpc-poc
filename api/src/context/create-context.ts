import { inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { localAuth } from './local-auth'
import { productionAuth } from './production-auth'

export const createContext =
  (getAuthCtx: typeof localAuth | typeof productionAuth) =>
  async ({ req }: trpcExpress.CreateExpressContextOptions) =>
    getAuthCtx(req)

export type Context = inferAsyncReturnType<typeof createContext>
