'use server'

import bcrypt from 'bcryptjs'

import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { newPasswordSchema, newPasswordSchemaType } from '@/schemas'
import { db } from '@/lib/db'

export const newPassword = async (
  value: newPasswordSchemaType,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'missing token!' }
  }
  const validatedFields = newPasswordSchema.safeParse(value)

  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) return { error: 'invalid token' }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  const exsitingUser = await getUserByEmail(existingToken.email)

  if (!exsitingUser) {
    return { error: 'email does not exist' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: exsitingUser.id },
    data: { password: hashedPassword },
  })

  await db.passwordResetToken.delete({ where: { id: existingToken.id } })

  return {success: 'password updated'}
}
