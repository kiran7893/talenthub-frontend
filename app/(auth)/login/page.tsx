import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In | TalentHub",
  description: "Sign in to your TalentHub account",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
