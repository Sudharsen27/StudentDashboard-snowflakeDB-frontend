/** Same-origin proxy (see next.config rewrites). Avoids cross-origin + localhost IPv6 issues. */
const DEFAULT_BASE_URL = "/api";

export function getApiBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  const base =
    raw !== undefined && raw !== "" ? raw : DEFAULT_BASE_URL;
  return base.replace(/\/$/, "");
}

export async function apiJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${getApiBaseUrl()}${path}`, init);
  } catch (e) {
    const hint =
      "Cannot reach the API. Start the backend on port 5000 (see /backend) or set NEXT_PUBLIC_API_BASE_URL.";
    if (e instanceof TypeError) {
      throw new Error(hint);
    }
    throw e;
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}

