"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ExperienceDetailsValues } from "@/lib/validations/onboarding";

const labelClass =
  "text-[20px] leading-[21px] text-black [font-family:var(--font-dm-sans),sans-serif]";

const selectTriggerClass =
  "h-[69px] w-full rounded-[20px] border border-black/30 bg-white px-[25px] py-[25px] text-[20px] leading-[21px] text-black/80 data-[placeholder]:text-black/48 [font-family:var(--font-inter),sans-serif]";

const EXPERIENCE_LEVELS = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];
const TOOLS_OPTIONS = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Other",
];
const INDUSTRY_EXPERIENCE = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Other",
];

export interface ExperienceDetailsStepProps {
  value: ExperienceDetailsValues;
  onChange: (value: ExperienceDetailsValues) => void;
  errors?: Partial<Record<keyof ExperienceDetailsValues, string>>;
}

export function ExperienceDetailsStep({
  value,
  onChange,
  errors = {},
}: ExperienceDetailsStepProps) {
  const set = (field: keyof ExperienceDetailsValues) => (val: string) =>
    onChange({ ...value, [field]: val });

  return (
    <>
      <h2
        className="text-2xl font-semibold text-black mb-1"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        Your experience
      </h2>
      <p
        className="text-lg text-black/68 mb-8"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        Just a quick overview. You can add more details later.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col gap-5">
          <Label htmlFor="experienceLevel" className={labelClass}>
            Experience Level
          </Label>
          <Select
            value={value.experienceLevel}
            onValueChange={(v) => set("experienceLevel")(v)}
          >
            <SelectTrigger
              id="experienceLevel"
              className={cn(selectTriggerClass, "w-full")}
            >
              <SelectValue placeholder="How long have you been working professionally?" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVELS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.experienceLevel && (
            <p className="text-sm text-[#DB7E20]">
              {errors.experienceLevel}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="industryExperience" className={labelClass}>
            Industry experience
          </Label>
          <Select
            value={value.industryExperience}
            onValueChange={(v) => set("industryExperience")(v)}
          >
            <SelectTrigger
              id="industryExperience"
              className={cn(selectTriggerClass, "w-full")}
            >
              <SelectValue placeholder="Select the industries you've worked in or interested in" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_EXPERIENCE.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industryExperience && (
            <p className="text-sm text-[#DB7E20]">
              {errors.industryExperience}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Label htmlFor="toolsOrTechnologies" className={labelClass}>
          Tools or technologies (optional)
        </Label>
        <Select
          value={value.toolsOrTechnologies || "__none__"}
          onValueChange={(v) => set("toolsOrTechnologies")(v === "__none__" ? "" : v)}
        >
          <SelectTrigger
            id="toolsOrTechnologies"
            className={cn(selectTriggerClass, "w-full")}
          >
            <SelectValue placeholder="Add tools or technologies you're comfortable with" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">None</SelectItem>
            {TOOLS_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.toolsOrTechnologies && (
          <p className="text-sm text-[#DB7E20]">
            {errors.toolsOrTechnologies}
          </p>
        )}
      </div>
    </>
  );
}
