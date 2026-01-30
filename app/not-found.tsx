import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFBFF] flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-[48px] font-semibold text-black mb-4"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          404
        </h1>
        <p
          className="text-xl text-black/68 mb-8"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Page not found
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-[10px] bg-[#FF5134] text-white font-semibold hover:opacity-90"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
