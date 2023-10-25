import "../styles/globals.css";

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'ZZ Tech - Web app',
  description: 'Exemplo de aplicação ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}
