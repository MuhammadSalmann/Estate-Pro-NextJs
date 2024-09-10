import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoke on successful sign in
    async signIn({ profile }) {
      // Connect to database
      // Check if user exists
      // If not, create user to db
      // Return true to allow sign in
    },
    // Modifies the session object
    async session({ session }) {
      // Add user from db
      // assign user id to session
      //  return session;
    },
  },
};
