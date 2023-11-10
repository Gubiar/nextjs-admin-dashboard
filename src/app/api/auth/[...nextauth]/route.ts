import { DbUserProps } from "@/types/types";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials, req) {
                const res = await fetch("https://server-gubiar.vercel.app/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" },
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({token, user}) {
            user && (token.user = user)
            return token;
        },
        async session({session, token}){
            session.user = token.user as DbUserProps;
            return session
        }
    }
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions }
