"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/api/api";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post("/auth/refresh");
        setAccessToken(data.accessToken);
      } catch {
        // setAccessToken(null);
      }
    })();
  }, [setAccessToken]);

  return children;
}
