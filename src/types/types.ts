export interface DbUserProps {
    success: string
    message: string
    id: number
    name: string
    email: string
    token: string
}

export interface AuthPageProps {
    isLogin: boolean,
    email: string,
    password: string,
    confirmPassword?: string,
    name?: string
}

