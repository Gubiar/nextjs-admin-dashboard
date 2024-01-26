'use client'

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const sairApp = async () => {
        await signOut({
            redirect: false,
        });
        router.replace('/')
    }

    return <>
        <h1>Welcome {session?.user.name}</h1>
        <Button onClick={sairApp}>Sair</Button>
    </>
}