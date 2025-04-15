import { api } from "../api";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => await api.post("/users/login", { email, password });

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => await api.post("/users/register", { name, email, password });
