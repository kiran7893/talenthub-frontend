import { cn } from "@/lib/utils";

/**
 * Left panel geometric shapes – Figma specifications
 * Canvas: 720px × 1024px (50% of 1440px total width)
 */
function AuthDecoration() {
  return (
    <div className="relative hidden h-full w-1/2 shrink-0 overflow-hidden rounded-l-[30px] bg-white lg:block">
      {/* Ellipse 1 – red-orange, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          left: "4.86%", // 35px / 720px
          top: "-5.47%", // -56px / 1024px
          width: "40.56%", // 292px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#FF5134",
        }}
      />
      {/* Ellipse 2 – grey, mid-left */}
      <div
        className="absolute rounded-full"
        style={{
          left: "44.44%", // 320px / 720px
          top: "21.97%", // 225px / 1024px
          width: "40.56%", // 292px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#CCCCCC",
        }}
      />
      {/* Rectangle 11 – deep blue, top-right */}
      <div
        className="absolute"
        style={{
          left: "45.42%", // 327px / 720px
          top: "-5.47%", // -56px / 1024px
          width: "38.61%", // 278px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#01629E",
        }}
      />
      {/* Ellipse 3 – red-orange, bottom-right (rotated) */}
      <div
        className="absolute rounded-full"
        style={{
          left: "45%", // 324px / 720px
          top: "77.44%", // 793px / 1024px
          width: "40.56%", // 292px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#FF5134",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Ellipse 4 – grey, bottom-left (rotated) */}
      <div
        className="absolute rounded-full"
        style={{
          left: "5%", // 36px / 720px
          top: "49.41%", // 506px / 1024px
          width: "40.56%", // 292px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#CCCCCC",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Rectangle 12 – deep blue, bottom (rotated) */}
      <div
        className="absolute"
        style={{
          left: "4.13%", // 29.7px / 720px
          top: "76.86%", // 787.05px / 1024px
          width: "40.83%", // 293.99px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#01629E",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Rectangle 13 – light blue, bottom-mid (rotated) */}
      <div
        className="absolute"
        style={{
          left: "45.01%", // 324.07px / 720px
          top: "50.02%", // 512.24px / 1024px
          width: "40.56%", // 292px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#7EAFCF",
          transform: "rotate(179.45deg)",
        }}
      />
      {/* Rectangle 10 – light blue, mid-left */}
      <div
        className="absolute"
        style={{
          left: "4.31%", // 31px / 720px
          top: "22.07%", // 226px / 1024px
          width: "40.56%", // 292px / 720px
          height: "27.44%", // 281px / 1024px
          background: "#7EAFCF",
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
        "flex min-h-screen w-full items-center justify-center bg-[#f5f5f5] p-4",
        "[font-family:var(--font-dm-sans),sans-serif]",
        className
      )}
    >
      <div className="relative flex max-h-[1024px] w-full max-w-[1440px] flex-1 flex-row overflow-hidden rounded-[30px] bg-white shadow-lg" style={{ height: "min(1024px, calc(100vh - 2rem))" }}>
        <AuthDecoration />
        {/* Right: form panel – Figma Rectangle 7: 676px × 964px, left: 720px, top: 30px, #FAFBFF, border-radius 20px */}
        <div
          className="absolute flex flex-col items-center justify-center px-6 py-8"
          style={{
            left: "50%",
            top: "2.93%", // 30px / 1024px
            width: "46.94%", // 676px / 1440px
            height: "94.14%", // 964px / 1024px
            background: "#FAFBFF",
            borderRadius: "20px",
          }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
