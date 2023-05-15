import React from 'react'
import { trpc } from '~/libs/trpc'

export const Header = (): JSX.Element => {
  const { data } = trpc.companyRouter.getCompany.useQuery()

  return (
    <div className="mb-7 flex items-center h-15 pt-2 pr-6 sticky top-0 z-20 shadow-secondaryAction bg-blueGray-50">
      <div className="flex items-center">
        <div className="mr-7 ml-4 mb-1 flex flex-col justify-start">
          <div className="text-sm font-semibold text-blueGray-600">
            {data && data.name}
          </div>
        </div>
      </div>
    </div>
  )
}
