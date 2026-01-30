import { z } from "zod";

/** Client-side login form validation (aligned with backend LoginDto). */
export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

/** Client-side signup form validation (aligned with backend SignupDto). */
export const signupFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .refine(
      (s) => {
        const parts = s.trim().split(/\s+/).filter(Boolean);
        return parts.length >= 2 && parts[0].length >= 2 && parts.slice(1).join("").length >= 2;
      },
      "Enter first and last name (at least 2 characters each)"
    ),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

/** Split fullName into firstName and lastName for API. */
export function fullNameToFirstLast(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") ?? "";
  return { firstName, lastName };
}
