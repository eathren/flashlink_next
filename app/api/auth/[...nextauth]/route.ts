// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  // You can add multiple providers
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" }
        return user
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is defined, we just logged in. Attach it to the token.
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Make the token.id available in session.user
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
