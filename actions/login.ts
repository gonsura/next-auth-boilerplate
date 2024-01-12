'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema, LoginSchemaType } from '@/schemas'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success)
    return {
      error: 'Invalid fields',
    }
  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password)
    return {
      error: 'email does not exist',
    }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )
    return { succcess: 'you is not verified, please check your email' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'something went wrong' }
      }
    }
    throw error
  }
}
