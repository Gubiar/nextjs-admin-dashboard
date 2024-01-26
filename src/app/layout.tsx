import NextAuthSessionProvider from "@/providers/sessionProvider";
import "../styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ZZ Tech - Web app",
    description: "Exemplo de aplicação ",
};

import { cn } from "../lib/utils"
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
            </body>
        </html>
    );
}
