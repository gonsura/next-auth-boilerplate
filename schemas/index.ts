import * as z from 'zod'

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'minimum of 6 character is required' }),
})

export type newPasswordSchemaType = z.infer<typeof newPasswordSchema>

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
})

export type ResetSchemaType = z.infer<typeof ResetSchema>

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(1, { message: 'Name is required' }),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
