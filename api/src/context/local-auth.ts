import { Request } from 'express'
import jwtDecode from 'jwt-decode'

import {
  DEV_USER_EMAIL,
  DEV_IP_ADDRESS,
  DEV_USER_NAME,
  DEV_USER_GROUPS,
  DEV_COMPANY_ID,
  DEV_MERCHANT_ID
} from '../consts'

export const localAuth = ({ headers }: Request) => {
  const authJwt = headers.authorization?.split(' ')?.[1]
  if (authJwt) {
    const { iss, ...payload } = jwtDecode<{
      iss: string
      email?: string
      mid?: string
      cid?: string
      name?: string
      sub?: string
      customClaims: { merchantId: string; companyId: string }
    }>(authJwt)

    if (iss === '@pay-com/onboarding') {
      const { email, mid, cid } = payload

      return {
        companyId: cid || DEV_COMPANY_ID,
        merchantId: mid || DEV_MERCHANT_ID,
        userGroupsString: DEV_USER_GROUPS,
        userEmail: email,
        deviceIpAddress: DEV_IP_ADDRESS
      }
    }

    const {
      name,
      sub: id,
      email,
      customClaims: { merchantId, companyId }
    } = payload

    return {
      companyId: companyId || DEV_COMPANY_ID,
      merchantId: merchantId || DEV_MERCHANT_ID,
      userId: id,
      userGroupsString: DEV_USER_GROUPS,
      userEmail: email,
      userName: name,
      deviceIpAddress: DEV_IP_ADDRESS
    }
  }

  return {
    companyId: DEV_COMPANY_ID,
    merchantId: DEV_MERCHANT_ID,
    userGroupsString: DEV_USER_GROUPS,
    deviceIpAddress: DEV_IP_ADDRESS
  }
}
