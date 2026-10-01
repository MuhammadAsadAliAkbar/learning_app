import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({ baseURL: API, headers: { "Content-Type": "application/json" } });

api.interceptors.request.use((c) => {
  if (typeof window !== "undefined") {
    const t = localStorage.getItem("token");
    if (t) c.headers.Authorization = `Bearer ${t}`;
  }
  return c;
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(e);
  }
);

export default api;
export const login = (d: any) => api.post("/auth/login", d);
export const register = (d: any) => api.post("/auth/register", d);
export const getMe = () => api.get("/auth/me");
export const updateProgress = (d: any) => api.put("/auth/progress", d);
export const getChapters = () => api.get("/chapters");
export const getChapter = (id: string) => api.get(`/chapters/${id}`);
export const calc = (tool: string, data: any) => api.post(`/calc/${tool}`, data);
export const savePractice = (d: any) => api.post("/practice/save", d);
