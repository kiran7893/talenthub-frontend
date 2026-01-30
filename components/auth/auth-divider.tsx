/** Figma: "Or continue with" – DM Sans 400 20px line-height 26px #000 */
export function AuthDivider() {
  return (
    <div className="relative flex w-full max-w-[461px] items-center gap-4">
      <span className="h-px flex-1 bg-black/20" />
      <span
        className="shrink-0 text-center font-normal text-black"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "20px",
          lineHeight: "26px",
        }}
      >
        Or continue with
      </span>
      <span className="h-px flex-1 bg-black/20" />
    </div>
  );
}
