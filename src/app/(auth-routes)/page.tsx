"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../styles/AuthPage.module.css";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    isLogin: boolean
};

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log(data);
        
        let body = {};
        if(!isLogin){
            body = {
                isLogin,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                name: data.name,
                redirect: false,
            };
        } else {
            body = {
                isLogin,
                email: data.email,
                password: data.password,
                redirect: false,
            };
        }

        const result = await signIn('credentials', body);

        if(result?.ok) {
            router.replace("/admin")
        } else if(result?.error) {
            console.log(result);
            return;
        }
    };

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <header>
                    <h1>{isLogin ? "Faça o login" : "Cadastre-se"}</h1>
                    {!isLogin && <p>É gratis, para sempre!</p>}
                </header>
                {!isLogin && (
                    <label>
                        <span>Nome</span>
                        <input type="text" {...register("name", { required: true })} />
                        {errors.name && <span className={styles.error}>O nome é obrigatório</span>}
                    </label>
                )}
                <label htmlFor="email">
                    <span>Email</span>
                    <input type="email" {...register("email", { required: true })} />
                    {errors.email && <span className={styles.error}>O email é obrigatório</span>}
                </label>
                <label htmlFor="password">
                    <span>Senha</span>
                    <input
                        type="password"
                        {...register("password", {
                            required: { value: true, message: "A senha é obrigatoria" },
                            minLength: {
                                value: 6,
                                message: "A senha deve ter no mínimo 6 caracteres",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className={styles.error}>{errors.password?.message}</span>
                    )}
                </label>
                {!isLogin && (
                    <label htmlFor="confirmPassword">
                        <span>Confirme sua senha</span>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: { value: true, message: "A senha é obrigatoria" },
                                minLength: {
                                    value: 6,
                                    message: "A senha deve ter no mínimo 6 caracteres",
                                },
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className={styles.error}>{errors.password?.message}</span>
                        )}
                    </label>
                )}
                <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
                <button onClick={() => {
                    reset();
                    setIsLogin((prev) => !prev);
                }} type="button">
                    {isLogin ? "Não tem Login? Cadastre-se" : "Já possui cadastro? Faça o login"}
                </button>
            </form>
        </main>
    );
}
