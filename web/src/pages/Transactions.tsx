import React from 'react'
import { trpc } from '~/libs/trpc'

export const TransactionsPage = () => {
  const { data } = trpc.transactionsRouter.getTransactions.useQuery({
    filterParams: {
      equal: {
        companyId: '206081988854024192',
      },
    },
  })

  console.log(data?.rows[0].dateTime)

  return data ? (
    <div className="text-sm font-semibold text-blueGray-600 mx-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  ) : null
}
