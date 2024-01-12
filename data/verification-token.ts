import { db } from '@/lib/db'

export const getVerificationTokenbyToken = async (token: string) => {
  try {
    const verivicationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    })
    return verivicationToken
  } catch {
    return null
  }
}


export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verivicationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    })
    return verivicationToken
  } catch {
    return null
  }
}
