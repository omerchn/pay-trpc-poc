import { describe, expect, it } from 'vitest'
import {
  DEV_COMPANY_ID,
  DEV_MERCHANT_ID,
  DEV_USER_GROUPS,
  DEV_IP_ADDRESS
} from '../src/consts'
import { appRouter } from '../src/routes/app-router'

describe('company endpoint', () => {
  const caller = appRouter.createCaller({
    companyId: DEV_COMPANY_ID,
    merchantId: DEV_MERCHANT_ID,
    userGroupsString: DEV_USER_GROUPS,
    deviceIpAddress: DEV_IP_ADDRESS
  })

  it('can get company from context', async () => {
    const company = await caller.companyRouter.getCompany()
    expect(company.id).toBe(DEV_COMPANY_ID)
  })

  it('can get transactions', async () => {
    const transactions = await caller.transactionsRouter.getTransactions({
      orderBy: {
        id: 'DESC'
      }
    })
    expect(transactions.rows).toBeDefined()

    const row = transactions.rows[0]

    row.id
  })
})
