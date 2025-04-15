"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  getIsAuth: () => boolean;
  setAccessToken: (t: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      getIsAuth: () => !!get().accessToken,
      setAccessToken: (t) =>
        set({
          accessToken: t,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);
