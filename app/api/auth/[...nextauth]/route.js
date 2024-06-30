import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "136182404416-5u552qtj9fo8uj8s9cbkngp345fa181n.apps.googleusercontent.com", //test key
      clientSecret: "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", //testkey
    }),
  ],
});

export { handler as GET, handler as POST };
