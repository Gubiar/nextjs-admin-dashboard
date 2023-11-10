import NextAuth from "next-auth/next";
import { DbUserProps } from "./types";

declare module "next-auth" {
    interface Session {
        user: DbUserProps
    }
}
