"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { loginSubmit } from "@/api/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.css";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  if (useAuthStore.getState().getIsAuth()) {
    redirect("/dashboard");
  }

  const [state, formAction] = useActionState(loginSubmit, {
    error: null,
    fields: { email: "", password: "" },
  });

  useEffect(() => {
    if (state.error) {
      toast(state.error);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.formContainer}>
        <h1>Login</h1>
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
        <Button type="submit">Login</Button>
        <Link href="/register">Register</Link>
      </form>
    </div>
  );
}
