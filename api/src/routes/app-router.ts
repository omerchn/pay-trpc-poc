import { createRouter } from '../trpc'
import { companyRouter } from './company/company-router'
import { transactionsRouter } from './transactions/transactions-router'

export const appRouter = createRouter({
  companyRouter,
  transactionsRouter
})

export type AppRouter = typeof appRouter
