'use server'

import { ResetSchema, ResetSchemaType } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const reset = async (values: ResetSchemaType) => {
  const validatedField = ResetSchema.safeParse(values)

  if (!validatedField.success)
    return {
      error: 'Invalid email!',
    }

  const { email } = validatedField.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser)
    return {
      error: 'email does not exist',
    }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: 'Reset email sent' }
}
