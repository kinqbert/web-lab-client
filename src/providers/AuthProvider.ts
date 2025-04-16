"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/api/api";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshToken, setTokens, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!refreshToken) return;

    let cancelled = false;

    (async () => {
      try {
        const { data } = await api.post("/users/refresh", { refreshToken });
        if (!cancelled) setTokens(data.accessToken, refreshToken);
      } catch {
        if (cancelled) return;
        logout();
        redirect("/login");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshToken, setTokens, logout, router]);

  return children;
}
