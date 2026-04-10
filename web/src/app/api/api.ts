const apiBaseUrl =
  typeof window === "undefined"
    ? process.env.API_INTERNAL_URL
    : process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error("API base URL is not defined.");
}

export function getHardcoverHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("hyperion_hardcover_api_key");

  if (!token) return {};
  return { "X-Hardcover-Token": token };
}

export default async function apiFetch(path: string, options?: RequestInit) {
  return await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    ...options,
  });
}
