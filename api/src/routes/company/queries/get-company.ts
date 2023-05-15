import companyProvider from '@pay-com/core-companies'
import { TRPCError } from '@trpc/server'
import { procedure } from '../../../trpc'
import { z } from 'zod'

export const getCompany = procedure
  .input(
    z
      .object({
        companyId: z.string()
      })
      .optional()
  )
  .query(async ({ ctx, input }) => {
    const id = input?.companyId ?? ctx.companyId

    if (!id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'context missing company ID'
      })
    }
    const company = await companyProvider.getByID({ id })

    return company
  })
