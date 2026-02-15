const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
);

export default function VerificationSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl shadow-xl p-8 border border-slate-100 bg-white">
        {/* Logo Section Skeleton */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-32 h-6" />
        </div>

        {/* Text Section Skeleton */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Skeleton className="w-48 h-8" />
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="w-64 h-4" />
            <Skeleton className="w-40 h-4" />
          </div>
        </div>

        {/* OTP Input Grid Skeleton */}
        <div className="space-y-8">
          <div className="flex justify-between gap-2 max-w-[320px] mx-auto">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-12 h-12 rounded-xl" />
            ))}
          </div>

          {/* Button Skeleton */}
          <Skeleton className="w-full h-14 rounded-2xl" />
        </div>

        {/* Footer Section Skeleton */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 w-full">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-32 h-8 rounded-2xl" />
          </div>

          <div className="w-full border-t border-slate-100" />

          <Skeleton className="w-28 h-4" />
        </div>
      </div>
    </div>
  );
}
