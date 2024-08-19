import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          const user = JSON.parse(credentials.userWithoutPassword)
          // Everything is handled in the action at src/action/login.js, not here, because an error is caused due to Mongoose not being usable in the Edge runtime environment in Next.js.
          return user
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.phoneNumber = user.phoneNumber;
        token.country = user.country;
        token.email = user.email;
        token.fullName = user.fullName;
        token.username = user.username;
        token.role = user.role;
        // token.profilePic = user.profilePic;
        token.isBlocked = user.isBlocked;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.phoneNumber = token.phoneNumber;
        session.user.country = token.country;
        session.user.email = token.email;
        session.user.fullName = token.fullName;
        session.user.username = token.username;
        session.user.role = token.role;
        // session.user.profilePic = token.profilePic;
        session.user.isBlocked = token.isBlocked;
      }
      return session;
    }
  }
})