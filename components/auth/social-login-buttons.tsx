"use client";

/** Figma: 62×62px each, rounded corners */
const SOCIAL = [
  { name: "Facebook", href: "#", bg: "#1877F2", icon: "f" },
  { name: "Twitter", href: "#", bg: "#1DA1F2", icon: "𝕏" },
  { name: "LinkedIn", href: "#", bg: "#0A66C2", icon: "in" },
] as const;

export function SocialLoginButtons() {
  return (
    <div className="flex justify-center gap-[30px]">
      {SOCIAL.map(({ name, href, bg, icon }) => (
        <a
          key={name}
          href={href}
          className="flex size-[62px] items-center justify-center rounded-lg text-xl font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: bg }}
          aria-label={`Sign in with ${name}`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
