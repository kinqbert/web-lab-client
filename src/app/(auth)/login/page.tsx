import LoginForm from "@/components/auth/LoginForm/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has("accessToken");

  if (hasAccessToken) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
