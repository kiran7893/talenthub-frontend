"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { AuthDivider } from "@/components/auth/auth-divider";
import {
  signupFormSchema,
  fullNameToFirstLast,
  type SignupFormValues,
} from "@/lib/validations/auth";
import { getApiUrl } from "@/lib/api";
import type { AuthResponse } from "@/lib/types/auth";

const AUTH_STORAGE_KEY = "talenthub_auth";

function storeAuth(data: AuthResponse) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function parseApiError(text: string): string {
  let message = "Something went wrong. Please try again.";
  try {
    const json = JSON.parse(text) as { message?: string | string[] };
    if (Array.isArray(json.message)) message = json.message[0] ?? message;
    else if (typeof json.message === "string") message = json.message;
  } catch {
    // use default
  }
  return message;
}

/** Figma: inputs 461×71, padding 25px, border 1px rgba(0,0,0,0.34), rounded 20px; placeholder Inter 20px rgba(0,0,0,0.48) */
const inputClass =
  "h-[71px] w-full max-w-[461px] rounded-[20px] border bg-white px-[25px] py-[25px] text-[20px] leading-[21px] placeholder:text-black/[0.48] [font-family:var(--font-inter),sans-serif] border-black/[0.34]";

/** Figma: button 461×60, #FF5134, rounded 10px; text DM Sans 600 24px #FAFBFF */
const buttonClass =
  "h-[60px] w-full max-w-[461px] rounded-[10px] text-[24px] font-semibold leading-[21px] text-[#FAFBFF] [font-family:var(--font-dm-sans),sans-serif] bg-[#FF5134] hover:opacity-95 disabled:opacity-50";

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setError(null);
    setLoading(true);
    const { firstName, lastName } = fullNameToFirstLast(values.fullName);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          firstName,
          lastName,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(parseApiError(text));
        return;
      }

      const data = (await res.json()) as AuthResponse;
      storeAuth(data);
      router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-[461px] flex-col items-center space-y-8">
      {/* Figma: Create Account – DM Sans 600 36px line-height 47px #000 */}
      <h1
        className="w-full text-center font-semibold text-black"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "36px",
          lineHeight: "47px",
        }}
      >
        Create Account
      </h1>

      <SocialLoginButtons />
      <AuthDivider />

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-[461px] flex-col gap-[32px]">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-2">
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter Your Full Name"
            disabled={loading}
            aria-invalid={!!form.formState.errors.fullName}
            className={inputClass}
            {...form.register("fullName")}
          />
          {form.formState.errors.fullName && (
            <p className="text-sm text-destructive">
              {form.formState.errors.fullName.message}
            </p>
          )}
        </div>
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
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter Password"
            disabled={loading}
            aria-invalid={!!form.formState.errors.password}
            className={inputClass}
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className={buttonClass} disabled={loading}>
          {loading ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      {/* Figma: "Already have an account ?" DM Sans 400 16px #000; "Sign In" 700 16px underline #FF5134 */}
      <p
        className="text-center font-normal text-black"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "16px",
          lineHeight: "21px",
        }}
      >
        Already have an account ?{" "}
        <Link
          href="/login"
          className="font-bold underline text-[#FF5134] hover:opacity-90"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px",
            lineHeight: "21px",
          }}
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
