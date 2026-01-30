"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  personalDetailsSchema,
  skillsDetailsSchema,
  experienceDetailsSchema,
  type PersonalDetailsValues,
  type SkillsDetailsValues,
  type ExperienceDetailsValues,
} from "@/lib/validations/onboarding";
import { getAccessToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PersonalDetailsStep } from "@/components/onboarding/personal-details-step";
import { SkillsDetailsStep } from "@/components/onboarding/skills-details-step";
import { ExperienceDetailsStep } from "@/components/onboarding/experience-details-step";

/** Map experienceLevel string from form to yearsOfExperience number for API. */
const experienceLevelToYears: Record<string, number> = {
  "0-1 years": 0,
  "1-3 years": 2,
  "3-5 years": 4,
  "5-10 years": 7,
  "10+ years": 10,
};

/** Build request body for POST /api/candidates/onboarding (CreateProfileDto shape). */
function buildOnboardingPayload(
  personal: PersonalDetailsValues,
  skills: SkillsDetailsValues,
  experience: ExperienceDetailsValues
) {
  const yearsOfExperience =
    experienceLevelToYears[experience.experienceLevel] ?? 0;
  let skillsPayload = [
    { group: "Industry", subGroups: [skills.industry].filter(Boolean) },
    { group: "Job Role", subGroups: [skills.jobRole].filter(Boolean) },
    {
      group: "Skills",
      subGroups: skills.skills?.length ? skills.skills : ["General"],
    },
  ].filter((s) => s.subGroups.length > 0);
  if (skillsPayload.length === 0) {
    skillsPayload = [{ group: "Profile", subGroups: ["General"] }];
  }

  return {
    firstName: personal.firstName,
    lastName: personal.lastName,
    email: personal.email,
    phone: personal.phoneNumber || undefined,
    professionalSummary: skills.professionalSummary,
    skills: skillsPayload,
    yearsOfExperience,
    industryExperience: [experience.industryExperience].filter(Boolean),
    systemsToolsExperience: experience.toolsOrTechnologies
      ? [experience.toolsOrTechnologies]
      : undefined,
    education: [],
  };
}

const STEPS = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Skills Details" },
  { id: 3, label: "Experience Details" },
];

const defaultPersonal: PersonalDetailsValues = {
  firstName: "",
  lastName: "",
  companyName: "",
  hiringManagerName: "",
  email: "",
  phoneNumber: "",
};

const defaultSkills: SkillsDetailsValues = {
  industry: "",
  jobRole: "",
  professionalSummary: "",
  skills: [],
};

const defaultExperience: ExperienceDetailsValues = {
  experienceLevel: "",
  toolsOrTechnologies: "",
  industryExperience: "",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [personal, setPersonal] = useState<PersonalDetailsValues>(defaultPersonal);
  const [skills, setSkills] = useState<SkillsDetailsValues>(defaultSkills);
  const [experience, setExperience] =
    useState<ExperienceDetailsValues>(defaultExperience);

  const [personalErrors, setPersonalErrors] = useState<
    Partial<Record<keyof PersonalDetailsValues, string>>
  >({});
  const [skillsErrors, setSkillsErrors] = useState<
    Partial<Record<keyof SkillsDetailsValues, string>>
  >({});
  const [experienceErrors, setExperienceErrors] = useState<
    Partial<Record<keyof ExperienceDetailsValues, string>>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validateStep1(): boolean {
    const result = personalDetailsSchema.safeParse(personal);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PersonalDetailsValues, string>> =
        {};
      result.error.issues.forEach((issue) => {
        const p = issue.path[0] as keyof PersonalDetailsValues | undefined;
        if (p != null && typeof p === "string" && !fieldErrors[p])
          fieldErrors[p] = issue.message;
      });
      setPersonalErrors(fieldErrors);
      return false;
    }
    setPersonalErrors({});
    return true;
  }

  function validateStep2(): boolean {
    const result = skillsDetailsSchema.safeParse(skills);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SkillsDetailsValues, string>> =
        {};
      result.error.issues.forEach((issue) => {
        const p = issue.path[0] as keyof SkillsDetailsValues | undefined;
        if (p != null && typeof p === "string" && !fieldErrors[p])
          fieldErrors[p] = issue.message;
      });
      setSkillsErrors(fieldErrors);
      return false;
    }
    setSkillsErrors({});
    return true;
  }

  function validateStep3(): boolean {
    const result = experienceDetailsSchema.safeParse(experience);
    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof ExperienceDetailsValues, string>
      > = {};
      result.error.issues.forEach((issue) => {
        const p = issue.path[0] as keyof ExperienceDetailsValues | undefined;
        if (p != null && typeof p === "string" && !fieldErrors[p])
          fieldErrors[p] = issue.message;
      });
      setExperienceErrors(fieldErrors);
      return false;
    }
    setExperienceErrors({});
    return true;
  }

  async function handleNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      const token = getAccessToken();
      if (!token) {
        router.push("/login");
        return;
      }
      setSubmitError(null);
      setLoading(true);
      try {
        const body = buildOnboardingPayload(personal, skills, experience);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
        const res = await fetch(`${baseUrl}/api/candidates/onboarding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setSubmitError(
            typeof data.message === "string"
              ? data.message
              : Array.isArray(data.message)
                ? data.message.join(" ")
                : "Something went wrong. Please try again."
          );
          return;
        }
        router.push("/dashboard");
      } catch {
        setSubmitError(
          "Something went wrong. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
      return;
    }
    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        <h1
          className="text-[32px] font-semibold leading-[21px] text-black mb-2"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Let&apos;s start with the basics
        </h1>
        <p
          className="text-base leading-[21px] text-black/68 mb-8"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Share a few details about you. This helps us personalize your
          dashboard.
        </p>

        {/* Stepper */}
        <div className="relative flex items-start gap-4 mb-10">
          <div
            className="absolute top-5 left-0 right-0 h-[3px] bg-[#CFD6DC] z-0"
            style={{ width: "calc(100% - 200px)", marginLeft: "50px" }}
          />
          <div className="relative z-10 flex w-full justify-between max-w-[1320px]">
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white text-base font-medium",
                    step > s.id && "bg-[#FF5134] text-white",
                    step === s.id && "bg-[#FF5134] text-white",
                    step < s.id && "bg-[#CFD6DC] text-white"
                  )}
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {step > s.id ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M5 12l5 5 9-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className="text-sm font-medium text-[#0D0B26] text-center"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-[20px] border-b border-black/10 p-8 md:p-10">
          {step === 1 && (
            <PersonalDetailsStep
              value={personal}
              onChange={setPersonal}
              errors={personalErrors}
            />
          )}
          {step === 2 && (
            <SkillsDetailsStep
              value={skills}
              onChange={setSkills}
              errors={skillsErrors}
            />
          )}
          {step === 3 && (
            <ExperienceDetailsStep
              value={experience}
              onChange={setExperience}
              errors={experienceErrors}
            />
          )}

          {submitError && (
            <p className="text-sm text-[#DB7E20] mt-4" role="alert">
              {submitError}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-10">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                className="h-11 px-6 rounded-[10px] bg-black/10 text-black font-semibold hover:bg-black/15 border-0"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              className="h-11 px-6 rounded-[10px] bg-[#18822F] text-[#FAFBFF] font-semibold hover:opacity-90 disabled:opacity-50"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              onClick={handleNext}
              disabled={loading}
            >
              {loading
                ? "Submitting…"
                : step === 3
                  ? "Submit"
                  : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
