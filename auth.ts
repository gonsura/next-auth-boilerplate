import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserId } from '@/data/user'
import { type UserRole } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log({user, account})
      // Allow OAuth without email verification
      if(account?.provider !== 'credentials') return true
      const existingUser = await getUserId(user.id)

      // prevent sign in without email verification
      if (!existingUser?.emailVerified) return false
      //todo 2fa check
      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserId(token.sub)
      if (!existingUser) return token

      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
