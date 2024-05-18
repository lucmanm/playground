import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters";


import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ... }
      },
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user. = token.role
      return session
    }
  }
})