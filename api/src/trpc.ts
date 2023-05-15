import { initTRPC } from '@trpc/server'
import { Context } from './context/create-context'

const t = initTRPC.context<Context>().create()

export const createRouter = t.router
export const createMiddleware = t.middleware
export const procedure = t.procedure
