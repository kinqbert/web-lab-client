import { redirect } from "next/navigation";
import { loginUser, registerUser } from "../requests/user";
import { AxiosError } from "axios";

export interface LoginData {
  error: string | null;
  fields: {
    email: string;
    password: string;
  };
}

export const loginSubmit = async (
  prevState: LoginData,
  formData: FormData
): Promise<LoginData> => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    await loginUser({ email, password });
  } catch (err) {
    const data = (err as AxiosError).response?.data;
    return {
      error: (data as { error: string })?.error || "Login failed",
      fields: { email, password },
    };
  }

  redirect("/dashboard");
};

export interface RegisterData {
  error: string | null;
  fields: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export const registerSubmit = async (
  prevState: { error: string | null },
  formData: FormData
): Promise<RegisterData> => {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const passwordConfirmation =
    formData.get("password_confirmation")?.toString() || "";

  if (password !== passwordConfirmation) {
    return {
      error: "Passwords don't match",
      fields: {
        name,
        email,
        password,
        passwordConfirmation,
      },
    };
  }

  try {
    await registerUser({ name, email, password });
  } catch (err) {
    const axiosErr = err as AxiosError<{ error?: string }>;
    const message =
      axiosErr.response?.data?.error || axiosErr.message || "Register failed";

    return {
      error: message,
      fields: { name, email, password, passwordConfirmation },
    };
  }

  redirect("/dashboard");
};
