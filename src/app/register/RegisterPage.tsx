"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./RegisterPage.module.css";
import { signIn } from "next-auth/react";

type Inputs = {
    email: string;
    name: string;
    company: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <header>
                    <h1>Cadastre-se</h1>
                    <p>É gratis, para sempre!</p>
                </header>
                <label>
                    <span>Nome</span>
                    <input type="text" {...register("name", { required: true })} />
                    {errors.name && <span className={styles.error}>O nome é obrigatório</span>}
                </label>
                <label htmlFor="email">
                    <span>Email</span>
                    <input type="email" {...register("email", { required: true })} />
                    {errors.email && <span className={styles.error}>O email é obrigatório</span>}
                </label>
                <label>
                    <span>Empresa</span>
                    <input type="text" {...register("company")} />
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
                <button type="submit">Enviar</button>
            </form>
        </main>
    );
}
