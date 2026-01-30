"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { PersonalDetailsValues } from "@/lib/validations/onboarding";

const labelClass =
  "text-[20px] leading-[21px] text-black [font-family:var(--font-dm-sans),sans-serif]";

const inputBase =
  "h-[69px] w-full rounded-[20px] border border-black/30 bg-white px-[25px] py-[25px] text-[20px] leading-[21px] placeholder:text-black/48 [font-family:var(--font-inter),sans-serif]";

export interface PersonalDetailsStepProps {
  value: PersonalDetailsValues;
  onChange: (value: PersonalDetailsValues) => void;
  errors?: Partial<Record<keyof PersonalDetailsValues, string>>;
}

export function PersonalDetailsStep({
  value,
  onChange,
  errors = {},
}: PersonalDetailsStepProps) {
  const set = (field: keyof PersonalDetailsValues) => (val: string) =>
    onChange({ ...value, [field]: val });

  return (
    <>
      <h2
        className="text-2xl font-semibold text-black mb-1"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        1. Personal Information
      </h2>
      <p
        className="text-lg text-black/68 mb-8"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        Just a few basic details to help us set up your profile. You can update
        this anytime.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5">
          <Label htmlFor="firstName" className={labelClass}>
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="First Name"
            value={value.firstName}
            onChange={(e) => set("firstName")(e.target.value)}
            className={cn(inputBase)}
          />
          {errors.firstName && (
            <p className="text-sm text-[#DB7E20]">{errors.firstName}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="lastName" className={labelClass}>
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            value={value.lastName}
            onChange={(e) => set("lastName")(e.target.value)}
            className={cn(inputBase)}
          />
          {errors.lastName && (
            <p className="text-sm text-[#DB7E20]">{errors.lastName}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="companyName" className={labelClass}>
            Company Name
          </Label>
          <Input
            id="companyName"
            placeholder="Enter Company Name"
            value={value.companyName}
            onChange={(e) => set("companyName")(e.target.value)}
            className={cn(inputBase)}
          />
          {errors.companyName && (
            <p className="text-sm text-[#DB7E20]">{errors.companyName}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="hiringManagerName" className={labelClass}>
            Hiring Manager Name
          </Label>
          <Input
            id="hiringManagerName"
            placeholder="Enter Hiring Manager Name"
            value={value.hiringManagerName}
            onChange={(e) => set("hiringManagerName")(e.target.value)}
            className={cn(inputBase)}
          />
          {errors.hiringManagerName && (
            <p className="text-sm text-[#DB7E20]">{errors.hiringManagerName}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="email" className={labelClass}>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter Official Email Id"
            value={value.email}
            onChange={(e) => set("email")(e.target.value)}
            className={cn(inputBase)}
          />
          {errors.email && (
            <p className="text-sm text-[#DB7E20]">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <Label htmlFor="phoneNumber" className={labelClass}>
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+91 1234567890"
            value={value.phoneNumber}
            onChange={(e) => set("phoneNumber")(e.target.value)}
            className={cn(inputBase)}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-[#DB7E20]">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
    </>
  );
}
