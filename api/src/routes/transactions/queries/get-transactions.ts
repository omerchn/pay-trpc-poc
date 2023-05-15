import logger from '@pay-com/logger'
import transactionsProvider from '@pay-com/core-transactions'
import { procedure } from '../../../trpc'
import { useFindByParamsProcedure } from '../../../utils'

// proto generated types are lacking?
// types manipulation as opposed to re-writing types
//
// this function improves the lacking types of findByParams
//
// it improves the input types:
// filterParams,orderBy keys are keys of return type of `getOneFn`
//
// and output types:
// rows is not a generic array, it's an array of the return type of `getOneFn`,
// row type is affected by `select`, leaving only selected keys.
// select is done in backend here as opposed to frontend,
// because that way similar queries can be cached together by react-query. creating more endpoints is cheap.
//
// it's also possible to extend this function to use an actual validator,
// we can do that when they are exported from grpc packages (joi schemas are already generated)
const { inputParser, outputParser } = useFindByParamsProcedure({
  findByParamsFn: transactionsProvider.findByParams,
  getOneFn: transactionsProvider.getByID,
  select: ['id', 'dateTime']
})

export const getTransactions = procedure
  .input(inputParser)
  .output(outputParser)
  .query(async ({ input }) => {
    const transactions = await transactionsProvider.findByParams(input)

    logger.info('got transactions, returning')

    return transactions
  })
