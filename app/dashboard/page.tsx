"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearAuth, AUTH_USER_KEY } from "@/lib/auth";

type StoredUser = { firstName?: string } | null;

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      setUser(raw ? (JSON.parse(raw) as StoredUser) : null);
    } catch {
      setUser(null);
    }
  }, []);

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-[32px] font-semibold text-black"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-[10px] font-semibold"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Logout
          </Button>
        </div>
        <p
          className="text-base text-black/68"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
        </p>
      </div>
    </div>
  );
}
