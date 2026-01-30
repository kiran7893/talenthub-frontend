import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In | TalentHub",
  description: "Sign in to your TalentHub account",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="flex min-h-[400px] items-center justify-center">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
