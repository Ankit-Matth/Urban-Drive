import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import connectDB from '@/utils/dbConfig'
import UserModel from "./models/Users"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
           await connectDB()
        }
    })
  ],
  pages: {
    // signIn: '/login',
    // signOut: '/',
  }
})