import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FetchWithAuthOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  params?: Record<string, string | number>;
  headers?: HeadersInit;
  cache?: RequestCache;
}

export async function fetchWithAuth(
  endpoint: string,
  options: FetchWithAuthOptions = {}
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    redirect("/login");
  }

  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const url = new URL(endpoint);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache ?? "no-store",
  });

  if (!res.ok) {
    console.error(`Failed to fetch ${endpoint}`, res.status);
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}
