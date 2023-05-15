import { createRouter } from '../../trpc'
import { getCompany } from './queries/get-company'

export const companyRouter = createRouter({
  getCompany
})
