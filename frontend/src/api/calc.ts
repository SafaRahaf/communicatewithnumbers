import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/calc",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface CalcNode {
  _id: string;
  parentId: string | null;
  operation: string | null;
  leftValue: number;
  rightValue: number | null;
  result: number;
  children?: CalcNode[];
}

export async function getTree() {
  const { data } = await API.get<CalcNode[]>("/tree");
  return data;
}

export async function startNumber(number: number) {
  const { data } = await API.post("/start", { number });
  return data;
}

export async function respondTo(
  parentId: string,
  operation: string,
  rightValue: number
) {
  const { data } = await API.post(`/respond/${parentId}`, {
    operation,
    rightValue,
  });
  return data;
}
