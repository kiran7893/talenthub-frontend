"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { SkillsDetailsValues } from "@/lib/validations/onboarding";

const labelClass =
  "text-[20px] leading-[21px] text-black [font-family:var(--font-dm-sans),sans-serif]";

const selectTriggerClass =
  "h-[69px] w-full rounded-[20px] border border-black/30 bg-white px-[25px] py-[25px] text-[20px] leading-[21px] text-black/80 data-[placeholder]:text-black/48 [font-family:var(--font-inter),sans-serif]";

const textareaClass =
  "min-h-[120px] w-full rounded-[20px] border border-black/30 bg-white px-[25px] py-[20px] text-[18px] leading-[21px] placeholder:text-black/48 [font-family:var(--font-inter),sans-serif] resize-y";

const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Manufacturing", "Other"];
const JOB_ROLES = ["Senior Developer", "Analyst", "Manager", "Specialist", "Other"];

export interface SkillsDetailsStepProps {
  value: SkillsDetailsValues;
  onChange: (value: SkillsDetailsValues) => void;
  errors?: Partial<Record<keyof SkillsDetailsValues, string>>;
}

export function SkillsDetailsStep({
  value,
  onChange,
  errors = {},
}: SkillsDetailsStepProps) {
  const set = (field: keyof SkillsDetailsValues) => (val: string | string[]) =>
    onChange({
      ...value,
      [field]: field === "skills" ? (val as string[]) : (val as string),
    });

  return (
    <>
      <h2
        className="text-2xl font-semibold text-black mb-1"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        2. Your skills
      </h2>
      <p
        className="text-lg text-black/68 mb-8"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        Select the skills that best describe what you do. This helps us
        recommend relevant opportunities.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col gap-5">
          <Label htmlFor="industry" className={labelClass}>
            Industry
          </Label>
          <Select
            value={value.industry}
            onValueChange={(v) => set("industry")(v)}
          >
            <SelectTrigger
              id="industry"
              className={cn(selectTriggerClass, "w-full")}
            >
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-[#DB7E20]">{errors.industry}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="jobRole" className={labelClass}>
            Job Role
          </Label>
          <Select value={value.jobRole} onValueChange={(v) => set("jobRole")(v)}>
            <SelectTrigger
              id="jobRole"
              className={cn(selectTriggerClass, "w-full")}
            >
              <SelectValue placeholder="Select Job Role" />
            </SelectTrigger>
            <SelectContent>
              {JOB_ROLES.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.jobRole && (
            <p className="text-sm text-[#DB7E20]">{errors.jobRole}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <h3
          className="text-2xl font-semibold text-black"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Professional Summary
        </h3>
        <p
          className="text-lg text-black/68"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          In a few lines, tell us about your experience and what you&apos;re
          good at. This helps recruiters understand you better.
        </p>
        <div className="relative">
          <Textarea
            placeholder="Write your professional summary here..."
            value={value.professionalSummary}
            onChange={(e) => set("professionalSummary")(e.target.value)}
            className={textareaClass}
            rows={4}
          />
          <p
            className="absolute bottom-3 right-4 text-sm leading-[21px] text-[#DB7E20]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Minimum of 50 characters
          </p>
        </div>
        {errors.professionalSummary && (
          <p className="text-sm text-[#DB7E20]">
            {errors.professionalSummary}
          </p>
        )}
      </div>
    </>
  );
}
