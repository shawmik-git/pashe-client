import { authClient } from "./auth-client";

const BASE = process.env.NEXT_PUBLIC_API_URL;

// auth: true attaches a fresh JWT from Better Auth as a Bearer token.
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Your session has expired. Log in again.");
    headers.Authorization = `Bearer ${data.token}`;
  }
  let res;
  try {
    res = await fetch(`${BASE}${path}`, { method, headers, body: body && JSON.stringify(body) });
  } catch {
    throw new Error("Can’t reach the server. Check your connection and try again.");
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Try again.");
  return json;
}
