"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";

import { registerSubmit } from "@/api/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.css";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const isAuth = useAuthStore((s) => s.isAuth);

  useEffect(() => {
    if (isAuth) {
      redirect("/dashboard");
    }
  }, [isAuth]);

  const [state, formAction] = useActionState(registerSubmit, {
    error: null,
    fields: { name: "", email: "", password: "", passwordConfirmation: "" },
  });

  useEffect(() => {
    if (state.error) {
      toast(state.error);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.formContainer}>
        <h1>Register</h1>
        <Input
          type="text"
          name="name"
          placeholder="Username"
          defaultValue={state.fields.name}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={state.fields.email}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={state.fields.password}
          required
        />
        <Input
          type="password"
          name="password_confirmation"
          placeholder="Password confirm"
          defaultValue={state.fields.passwordConfirmation}
          required
        />
        <Button type="submit">Register</Button>
        <Link href="/login">Login</Link>
      </form>
    </div>
  );
}
