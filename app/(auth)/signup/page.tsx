import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Create Account | TalentHub",
  description: "Create your TalentHub account",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
