import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcryptjs'
import connectDB from '@/utils/dbConfig'
import UserModel from "./models/Users"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          const email = credentials.email
          const password = credentials.password
          
          await connectDB()

          try {
            const user = await UserModel.findOne({ email })
  
            if (!user) {
              throw new Error("Invalid email or password")
            }

            const isPasswordMatched = await compare(password, user.password)

            if (isPasswordMatched) {
              return user
            } else {
              throw new Error("Invalid email or password")
            }
          } catch (error) {
            console.error("Error in authorization:", error)
            return null
          }
        }
    })
  ],
  pages: {
    signIn: "/login",
    signOut: "/"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
})