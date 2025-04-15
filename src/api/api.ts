import { useAuthStore } from "@/store/authStore";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}` || "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const setAccessToken = useAuthStore.getState().setAccessToken;
    const original = err.config as typeof err.config & { _retry?: boolean };

    if (!err.response || err.response.status !== 401) {
      return Promise.reject(err);
    }

    if (original?.url?.includes("/auth/refresh")) {
      return Promise.reject(err);
    }

    if (original && original._retry) {
      return Promise.reject(err);
    }

    try {
      original._retry = true;
      const { data } = await api.post("/auth/refresh");
      setAccessToken(data.accessToken);
      original!.headers!.Authorization = `Bearer ${data.accessToken}`;
      return api(original!);
    } catch (refreshErr) {
      setAccessToken(null);
      return Promise.reject(refreshErr);
    }
  }
);
