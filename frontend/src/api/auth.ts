import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export async function register(username: string, password: string) {
  const { data } = await API.post<AuthResponse>("/register", {
    username,
    password,
  });
  return data;
}

export async function login(username: string, password: string) {
  const { data } = await API.post<AuthResponse>("/login", {
    username,
    password,
  });
  return data;
}
