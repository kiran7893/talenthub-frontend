"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { AuthDivider } from "@/components/auth/auth-divider";
import { loginFormSchema, type LoginFormValues } from "@/lib/validations/auth";
import { AUTH_ACCESS_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/auth";

const inputClass =
  "h-[71px] w-full max-w-[461px] rounded-[20px] border bg-white px-[25px] py-[25px] text-[20px] leading-[21px] placeholder:text-black/[0.48] [font-family:var(--font-inter),sans-serif] border-black/[0.34]";

const buttonClass =
  "h-[60px] w-full max-w-[461px] rounded-[10px] text-[24px] font-semibold leading-[21px] text-[#FAFBFF] [font-family:var(--font-dm-sans),sans-serif] bg-[#FF5134] hover:opacity-95 disabled:opacity-50";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
};

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setError(null);
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(
            typeof data.message === "string"
              ? data.message
              : Array.isArray(data.message)
                ? data.message.join(" ")
                : "Something went wrong. Please try again."
          );
        }
        return;
      }

      // Backend wraps response in { data: { accessToken, refreshToken, user } }
      const payload = (data as { data?: AuthResponse }).data ?? (data as AuthResponse);
      const { accessToken, user } = payload;
      if (accessToken) {
        localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, accessToken);
        if (user) {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        }
      }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-[461px] flex-col items-center space-y-8">
      <h1
        className="w-full text-center font-semibold text-black"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "36px",
          lineHeight: "47px",
        }}
      >
        Sign In
      </h1>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[461px] flex-col gap-[32px]"
      >
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter Your Email Address"
            disabled={loading}
            aria-invalid={!!form.formState.errors.email}
            className={inputClass}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative w-full max-w-[461px]">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter Password"
              disabled={loading}
              aria-invalid={!!form.formState.errors.password}
              className={inputClass + " pr-14"}
              {...form.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-[25px] top-1/2 -translate-y-1/2 text-black/48 hover:text-black/70 focus:outline-none focus:ring-2 focus:ring-[#FF5134]/50 rounded p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-6 w-6" aria-hidden />
              ) : (
                <Eye className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className={buttonClass} disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <AuthDivider />
      <SocialLoginButtons />

      <p
        className="text-center font-normal text-black"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "16px",
          lineHeight: "21px",
        }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold underline text-[#FF5134] hover:opacity-90"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px",
            lineHeight: "21px",
          }}
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
