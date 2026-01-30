/**
 * Base URL for the NestJS API (includes /api prefix). Set via NEXT_PUBLIC_API_URL (e.g. http://localhost:5001).
 * NestJS uses app.setGlobalPrefix('api'), so auth routes are at /api/auth/login, /api/auth/signup.
 */
export function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  const base = url.replace(/\/$/, "");
  return `${base}/api`;
}
