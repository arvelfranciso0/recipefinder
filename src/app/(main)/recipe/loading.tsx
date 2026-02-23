import { MealCardSkeleton } from "@/components/shared/mealCardSkeleton";
import { PaginationSkeleton } from "@/components/shared/pagination";

export default function RecipeListSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb Skeleton */}
      <nav className="flex items-center gap-2 mb-3">
        <div className="h-4 w-12 bg-muted/10 rounded" />
        <div className="h-4 w-4 bg-muted/10 rounded" />
        <div className="h-4 w-16 bg-muted/10 rounded" />
      </nav>

      {/* Header Skeleton */}
      <div className="max-w-2xl mb-8">
        <div className="h-10 sm:h-12 w-3/4 bg-foreground/10 rounded-2xl mb-4" />
        <div className="h-4 w-full bg-muted/10 rounded mb-2" />
        <div className="h-4 w-5/6 bg-muted/10 rounded" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="h-10 w-full sm:w-40 bg-muted/10 rounded-xl" />
        <div className="h-10 w-full sm:w-40 bg-muted/10 rounded-xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <MealCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <PaginationSkeleton />
    </div>
  );
}
