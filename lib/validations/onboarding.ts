import { z } from "zod";

/** Step 1: Personal Details */
export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  companyName: z.string().min(2, "Company name is required"),
  hiringManagerName: z.string().min(2, "Hiring manager name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
});

/** Step 2: Skills Details */
export const skillsDetailsSchema = z.object({
  industry: z.string().min(1, "Select industry"),
  jobRole: z.string().min(1, "Select job role"),
  professionalSummary: z
    .string()
    .min(50, "Minimum of 50 characters required"),
  skills: z.array(z.string().min(1)).optional().default([]),
});

/** Step 3: Experience Details */
export const experienceDetailsSchema = z.object({
  experienceLevel: z.string().min(1, "Select experience level"),
  toolsOrTechnologies: z.string().optional().default(""),
  industryExperience: z.string().min(1, "Select industry experience"),
});

export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;
export type SkillsDetailsValues = z.infer<typeof skillsDetailsSchema>;
export type ExperienceDetailsValues = z.infer<typeof experienceDetailsSchema>;

export const fullOnboardingSchema = personalDetailsSchema
  .merge(skillsDetailsSchema)
  .merge(experienceDetailsSchema);

export type FullOnboardingValues = z.infer<typeof fullOnboardingSchema>;
