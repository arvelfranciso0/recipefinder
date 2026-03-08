export default function RecipeDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      {/* 1. RecipeHero Skeleton */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-muted/10 dark:bg-white/5 rounded-[3rem] overflow-hidden">
        <div className="absolute bottom-10 left-10 space-y-4 w-full max-w-lg">
          <div className="h-4 w-24 bg-primary/20 rounded-full" />
          <div className="h-12 w-3/4 bg-foreground/10 rounded-2xl" />
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-muted/10 rounded-lg" />
            <div className="h-6 w-20 bg-muted/10 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 2. IngredientList Skeleton (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="h-8 w-48 bg-foreground/10 rounded-xl mb-8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-muted/5"
            >
              <div className="flex items-center gap-3">
                <div className="size-5 bg-primary/10 rounded-md" />
                <div className="h-4 w-32 bg-muted/10 rounded" />
              </div>
              <div className="h-4 w-16 bg-muted/10 rounded" />
            </div>
          ))}
        </div>

        {/* 3. Preparation & Video Section (col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Steps Card Skeleton */}
          <section className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-7 bg-primary/20 rounded-lg" />
              <div className="h-8 w-56 bg-foreground/10 rounded-xl" />
            </div>

            <div className="space-y-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-6">
                  <div className="size-10 rounded-full bg-primary/10 shrink-0" />
                  <div className="space-y-3 w-full">
                    <div className="h-4 w-full bg-muted/10 rounded" />
                    <div className="h-4 w-5/6 bg-muted/10 rounded" />
                    <div className="h-4 w-4/6 bg-muted/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Video Placeholder Skeleton */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="size-7 bg-primary/20 rounded-lg" />
              <div className="h-8 w-40 bg-foreground/10 rounded-xl" />
            </div>
            <div className="aspect-video w-full bg-muted/10 dark:bg-white/5 rounded-3xl" />
          </section>

          {/* Source/Credit Skeleton */}
          <div className="mt-6 flex justify-end">
            <div className="h-8 w-40 bg-primary/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
