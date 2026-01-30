/** localStorage key for the JWT access token. */
export const AUTH_ACCESS_TOKEN_KEY = "talent_hub_access_token";

/** localStorage key for the current user object (JSON). */
export const AUTH_USER_KEY = "talent_hub_user";

/**
 * Returns the stored access token, or null if not present.
 * Use when calling protected APIs (e.g. Authorization: Bearer <token>).
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
}

/**
 * Clears the stored token and user (logout).
 */
export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}
