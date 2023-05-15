import { createRouter } from '../../trpc'
import { getTransactions } from './queries/get-transactions'

export const transactionsRouter = createRouter({
  getTransactions
})
