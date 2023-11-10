'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { data: session } = useSession();
    const router = useRouter();
    return <>
        <h1>Welcome {session?.user.user_name}</h1>
        <button onClick={async () => {
            await signOut({
                redirect: false,
            });
            router.replace('/')
        }}>Sair</button>
    </>
}