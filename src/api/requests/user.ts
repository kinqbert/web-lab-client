export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5050/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Login failed");
  }

  return await res.json();
};

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:5050/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Register failed");
  }

  return await res.json();
};
