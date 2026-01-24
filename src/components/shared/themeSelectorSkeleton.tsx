export function ThemeSelectorSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton for the Title/Description area */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-gray-200 dark:bg-white/10 animate-pulse rounded-lg" />
        <div className="h-4 w-64 bg-gray-100 dark:bg-white/5 animate-pulse rounded-lg" />
      </div>

      {/* Skeleton for the two Grid Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-30 rounded-2xl border-2 border-gray-100 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/10 animate-pulse" />
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 animate-pulse rounded" />
              <div className="h-3 w-32 bg-gray-100 dark:bg-white/5 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
