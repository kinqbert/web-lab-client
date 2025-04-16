import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has("accessToken");

  if (hasAccessToken) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
