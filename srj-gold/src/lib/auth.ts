import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" },
  pages: {
    signIn:  "/auth/signin",
    signOut: "/auth/signin",
    error:   "/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
      
        const { email, password } = credentials;
      
        // For prototype / local dev: only the admin email works.
        // In production replace with bcrypt password check against DB.
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          const user = await db.user.findUnique({
            where: { email },
          });
      
          return (
            user ?? {
              id: "admin",
              name: "Admin",
              email,
              role: "ADMIN",
            }
          );
        }
      
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findUnique({ where: { email: user.email! } });
        token.role = dbUser?.role ?? "USER";
        token.id   = dbUser?.id ?? user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id   = token.id;
      }
      return session;
    },
  },
};

// Convenience helper for Server Components
export const getAuth = () => getServerSession(authOptions);

// Guard helper — call in API routes / Server Actions
export async function requireAdmin() {
  const session = await getAuth();
  const role = (session?.user as any)?.role;
  if (!session || role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}
