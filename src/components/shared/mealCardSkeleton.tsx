export function MealCardSkeleton() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 flex flex-col h-full animate-pulse">
      {/* Image Area Placeholder - Using muted with low opacity for the large block */}
      <div className="h-48 w-full bg-muted/10 dark:bg-muted/20" />

      {/* Content Area Placeholder */}
      <div className="p-4 flex flex-col gap-2">
        {/* Tags Row - Using primary/10 to mimic the real tag background */}
        <div className="flex gap-1">
          <div className="h-4 w-12 bg-primary/10 rounded-md" />
          <div className="h-4 w-12 bg-primary/10 rounded-md" />
        </div>

        {/* Title Area - Using foreground with light opacity */}
        <div className="h-6 w-3/4 bg-foreground/10 rounded-lg mt-1" />

        {/* Footer Area */}
        <div className="flex justify-between mt-2 pt-2 border-t border-slate-50 dark:border-white/5">
          {/* Metadata placeholders using muted/10 */}
          <div className="h-4 w-24 bg-muted/10 rounded" />
          <div className="h-6 w-6 bg-primary/10 rounded-lg shrink-0" />
        </div>
      </div>
    </div>
  );
}
