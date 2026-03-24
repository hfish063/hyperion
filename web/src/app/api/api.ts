const API_BASE_URL = "http://localhost:8080/api";

export function getHardcoverHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("hyperion_hardcover_api_key");

  if (!token) return {};
  return { "X-Hardcover-Token": token };
}

export default async function apiFetch(path: string, options?: RequestInit) {
  return await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...options,
  });
}
