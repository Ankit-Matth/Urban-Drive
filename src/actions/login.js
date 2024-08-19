"use server"
import { signIn } from '@/auth'
import { compare } from 'bcryptjs'
import connectDB from '@/utils/dbConfig'
import UserModel from "@/models/Users"

export const loginHandler = async (formData) => {
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        await connectDB()

        const user = await UserModel.findOne({ email })
  
        if (!user) {
          return { success: false, message: "Invalid email or password" };
        }

        const isPasswordMatched = await compare(password, user.password)

        if (isPasswordMatched) {
          const { password, ...userWithoutPassword } = user.toObject();

          await signIn("credentials",{
            userWithoutPassword: JSON.stringify(userWithoutPassword),
            redirect: false
          })

          return { success: true, message: "Login successful" };

        } else {
            return { success: false, message: "Invalid email or password" };
        }
    } catch (error) {
        return { success: false, message: "Something went wrong", err: error.message};
    }
}