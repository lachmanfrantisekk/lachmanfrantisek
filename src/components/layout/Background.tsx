/**
 * Subtle ambient blue gradient blobs used as a decorative background.
 * Pointer-events disabled; sits behind all content.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-transparent to-transparent dark:from-[#0a1024] dark:via-[#05070f] dark:to-[#05070f]" />
      <div className="absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-brand-400/20 dark:bg-brand-600/10 blur-3xl animate-blob" />
      <div
        className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-sky-300/20 dark:bg-brand-500/10 blur-3xl animate-blob"
        style={{ animationDelay: '4s' }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-brand-200/25 dark:bg-sky-700/10 blur-3xl animate-blob"
        style={{ animationDelay: '8s' }}
      />
    </div>
  );
}
