import { AuthPageProps, DbUserProps } from "@/types/types";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const data = credentials as AuthPageProps; //req
        let user;

        // console.log(data);
        // console.log(typeof data.isLogin)

        if (String(data.isLogin) == 'true') {
          user = await prisma.user.findUnique({
            where: {
              email: data.email,
              senha: data.password,
            },
          });

          if (user) {
            return {
              id: String(user.id),
              email: user.email,
              name: user.name,
            };
          }

          throw new Error(
            JSON.stringify({
              message: "Não foi possível fazer o login",
              success: false,
            })
          );
        } else {
          if (data.password !== data.confirmPassword) {
            throw new Error(
              JSON.stringify({
                message: "As senhas informadas não são iguais",
                success: false,
              })
            );
          }

          user = await prisma.user.create({
            data: {
              email: data.email,
              senha: data.password,
              name: data.name,
            },
          });

          if (user) {
            return {
              id: String(user.id),
              email: user.email,
              name: user.name,
            };
          }

          throw new Error(
            JSON.stringify({
              message: "Não foi possível fazer o cadastro",
              success: false,
            })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as DbUserProps;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
