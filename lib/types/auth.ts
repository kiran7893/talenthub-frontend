/** Login request body (matches backend LoginDto). */
export interface LoginBody {
  email: string;
  password: string;
}

/** Signup request body (matches backend SignupDto). */
export interface SignupBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/** User object returned in auth response (matches backend AuthResponseDto.user). */
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

/** Auth API response (matches backend AuthResponseDto). */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
