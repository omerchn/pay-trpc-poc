import { Request } from 'express'

import {
  PAY_COMPANY_ID_HEADER_NAME,
  PAY_MERCHANT_ID_HEADER_NAME,
  DEVICE_IP_ADDRESS_HEADER_NAME,
  CFACCESS_USER_EMAIL_HEADER,
  CFACCESS_USER_NAME_HEADER,
  CFACCESS_USER_ID_HEADER,
  CFACCESS_GROUPS_HEADER,
  CLIENT_COUNTRY_HEADER_NAME
} from '../consts'

export const productionAuth = ({ headers }: Request) => ({
  companyId: headers[PAY_COMPANY_ID_HEADER_NAME] as string | undefined,
  merchantId: headers[PAY_MERCHANT_ID_HEADER_NAME] as string | undefined,
  userId: headers[CFACCESS_USER_ID_HEADER] as string | undefined,
  userGroupsString: headers[CFACCESS_GROUPS_HEADER] as string | undefined,
  userEmail: headers[CFACCESS_USER_EMAIL_HEADER] as string | undefined,
  userName: headers[CFACCESS_USER_NAME_HEADER] as string | undefined,
  userCountry: headers[CLIENT_COUNTRY_HEADER_NAME] as string | undefined,
  deviceIpAddress: headers[DEVICE_IP_ADDRESS_HEADER_NAME] as string | undefined
})
