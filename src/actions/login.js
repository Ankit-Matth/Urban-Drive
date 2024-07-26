"use server"
import { signIn } from '@/auth'

export const loginHandler = async (formData) => {
    const email = formData.get("email")
    const password = formData.get("password")

    try {
        await signIn("credentials",{
            email,
            password,
            redirect: false
        })

        return true;

    } catch (err) {
        console.log("Login failed")
        return false;
    }
}