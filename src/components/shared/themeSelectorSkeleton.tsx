export function ThemeSelectorSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title/Description Skeleton */}
      <div className="space-y-3 px-1">
        <div className="h-7 w-48 bg-muted/20 animate-pulse rounded-xl" />
        <div className="h-4 w-64 bg-muted/10 animate-pulse rounded-lg" />
      </div>

      {/* Grid Buttons Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-32 rounded-4xl border border-muted/10 bg-white dark:bg-white/5 p-5 flex flex-col justify-between shadow-sm"
          >
            {/* Top Row: Icon + Selection Circle */}
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-2xl bg-muted/10 animate-pulse" />
              <div className="w-6 h-6 rounded-full border-2 border-muted/10 bg-muted/5 animate-pulse" />
            </div>

            {/* Bottom Row: Text Labels */}
            <div className="space-y-2.5">
              <div className="h-4 w-20 bg-muted/20 animate-pulse rounded-md" />
              <div className="h-3 w-36 bg-muted/10 animate-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
