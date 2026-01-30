import { cn } from "@/lib/utils";

/**
 * Left panel geometric shapes – Figma spec (positions as % of panel).
 * Design 1440×1024, left section ~687px. Colors: #FF5134, #01629E, #7EAFCF, #CCCCCC.
 * Uses min-h-screen so percentage-sized shapes have a defined containing block.
 */
function AuthDecoration() {
  return (
    <div
      className="relative hidden h-screen w-[47.7%] shrink-0 overflow-hidden rounded-r-[30px] bg-white lg:block"
      style={{ height: "100vh" }}
    >
      {/* Ellipse 1 – red-orange, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          left: "5%",
          top: "-5.5%",
          width: "42.5%",
          height: "27.4%",
          background: "#FF5134",
        }}
      />
      {/* Rectangle 11 – dark blue, top-right */}
      <div
        className="absolute"
        style={{
          left: "47.6%",
          top: "-5.5%",
          width: "40.5%",
          height: "27.4%",
          background: "#01629E",
        }}
      />
      {/* Rectangle 10 – light blue, mid-left */}
      <div
        className="absolute"
        style={{
          left: "4.5%",
          top: "22%",
          width: "42.5%",
          height: "27.4%",
          background: "#7EAFCF",
        }}
      />
      {/* Ellipse 2 – grey circle, mid */}
      <div
        className="absolute rounded-full"
        style={{
          left: "46.6%",
          top: "22%",
          width: "42.5%",
          height: "27.4%",
          background: "#CCCCCC",
        }}
      />
      {/* Ellipse 4 – grey, rotated */}
      <div
        className="absolute rounded-full"
        style={{
          left: "5.2%",
          top: "49.4%",
          width: "42.5%",
          height: "27.4%",
          background: "#CCCCCC",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Rectangle 13 – light blue, rotated */}
      <div
        className="absolute"
        style={{
          left: "47%",
          top: "50%",
          width: "42.5%",
          height: "27.4%",
          background: "#7EAFCF",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Rectangle 12 – dark blue, rotated */}
      <div
        className="absolute"
        style={{
          left: "4.3%",
          top: "76.9%",
          width: "42.8%",
          height: "27.4%",
          background: "#01629E",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Ellipse 3 – red-orange, rotated */}
      <div
        className="absolute rounded-full"
        style={{
          left: "47%",
          top: "77.4%",
          width: "42.5%",
          height: "27.4%",
          background: "#FF5134",
          transform: "rotate(179.45deg)",
        }}
      />
    </div>
  );
}

export function AuthLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-row bg-white",
        "[font-family:var(--font-dm-sans),sans-serif]",
        className
      )}
      style={{ minHeight: "100vh" }}
    >
      <AuthDecoration />
      {/* Right: form panel – Figma Rectangle 7: #FAFBFF, border-radius 20px */}
      <div
        className="flex flex-1 flex-col items-center justify-center rounded-2xl px-6 py-8 lg:rounded-l-[20px] lg:rounded-r-none lg:px-12 lg:py-12"
        style={{ background: "var(--auth-form-bg)" }}
      >
        {children}
      </div>
    </div>
  );
}
