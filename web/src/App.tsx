import React from 'react'
import { TrpcProvider } from './libs/trpc'
import { Header } from '~/components/Header'
import { TransactionsPage } from '~/pages/Transactions'

export const App = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-blueGray-50">
      <TrpcProvider>
        <Header />
        <TransactionsPage />
      </TrpcProvider>
    </div>
  )
}
