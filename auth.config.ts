import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginSchema, LoginSchemaType } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'
import github from 'next-auth/providers/github'
import google from 'next-auth/providers/google'

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) return null
        const { email, password } = validatedFields.data
        const user = await getUserByEmail(email)

        // if logged in with other provider
        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) return user

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
