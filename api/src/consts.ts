import logger from '@pay-com/logger'
import dotEnv from 'dotenv'
import { z } from 'zod'
import packagejson from '../package.json'

dotEnv.config()

export const IS_PROD = process.env.NODE_ENV === 'production'

const envSchema = z.object({
  PORT: z.string(),
  PAY_MERCHANT_ID_HEADER_NAME: z.string().default('x-paycom-auth-merchant-id'),
  PAY_COMPANY_ID_HEADER_NAME: z.string().default('x-paycom-auth-company-id'),
  DEVICE_IP_ADDRESS_HEADER_NAME: z.string().default('cf-connecting-ip'),
  CLIENT_COUNTRY_HEADER_NAME: z.string().default('cf-ipcountry'),
  CFACCESS_USER_EMAIL_HEADER: z
    .string()
    .default('x-paycom-internal-auth-email'),
  CFACCESS_USER_NAME_HEADER: z.string().default('x-paycom-internal-auth-name'),
  CFACCESS_USER_ID_HEADER: z.string().default('x-paycom-internal-auth-user-id'),
  CFACCESS_GROUPS_HEADER: z.string().default('x-paycom-internal-auth-groups'),
  DEV: z.string(),
  DEV_MERCHANT_ID: z.string(),
  DEV_COMPANY_ID: z.string(),
  DEV_IP_ADDRESS: z.string(),
  DEV_USER_EMAIL: z.string().default('test.user@pay.com'),
  DEV_USER_NAME: z.string().default('test.user'),
  DEV_USER_GROUPS: z.string().default('backoffice.avengers.internal')
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  parsedEnv.error.errors.forEach(err => {
    logger.error(`env ${err.path[0]} ${err.message}`)
  })
  process.exit(1)
}

export const {
  PORT,
  PAY_MERCHANT_ID_HEADER_NAME,
  PAY_COMPANY_ID_HEADER_NAME,
  DEVICE_IP_ADDRESS_HEADER_NAME,
  CLIENT_COUNTRY_HEADER_NAME,
  CFACCESS_USER_EMAIL_HEADER,
  CFACCESS_USER_NAME_HEADER,
  CFACCESS_USER_ID_HEADER,
  CFACCESS_GROUPS_HEADER,
  DEV,
  DEV_MERCHANT_ID,
  DEV_COMPANY_ID,
  DEV_IP_ADDRESS,
  DEV_USER_EMAIL,
  DEV_USER_NAME,
  DEV_USER_GROUPS
} = parsedEnv.data

export const SERVICE_NAME = `${packagejson.name}:${packagejson.version}`
export const DEFAULT_QUERY_LIMIT = 10
