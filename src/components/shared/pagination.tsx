"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Button from "../ui/button";

export default function Pagination({
  total,
  currentList,
  handlePrevious,
  handleLoadMore,
}: {
  total: number;
  currentList: number;
  handleLoadMore: () => void;
  handlePrevious: () => void;
}) {
  const progress = total > 0 ? Math.min((currentList / total) * 100, 100) : 0;
  const isFinished = currentList >= total;
  return (
    <div className="flex flex-col items-center justify-center mt-16 gap-4">
      <p className="text-sm font-medium text-[#73816a] dark:text-gray-400">
        Showing {currentList} of {total} recipes
      </p>
      <div className="w-48 h-1 bg-[#e0e3dd] dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Only show previous if we are past the first page/chunk */}
        {handlePrevious && currentList > 10 && (
          <Button
            onClick={handlePrevious}
            variant="ghost"
            className="group flex items-center gap-2 text-muted hover:text-charcoal"
          >
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Previous
          </Button>
        )}

        {!isFinished ? (
          <Button
            onClick={handleLoadMore}
            variant="ghost"
            className="group flex items-center gap-2 text-muted hover:text-charcoal"
          >
            Next
            <ChevronRight
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Button>
        ) : (
          <p className="text-sm font-bold text-primary italic bg-primary/5 px-6 py-2 rounded-full">
            You've reached the end of the menu! 👨‍🍳
          </p>
        )}
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 gap-4 animate-pulse">
      {/* Text Placeholder */}
      <div className="h-4 w-40 bg-muted/10 rounded-md" />

      {/* Bar Placeholder */}
      <div className="w-48 h-1 bg-muted/10 rounded-full" />

      {/* Buttons Placeholder */}
      <div className="flex gap-8 mt-2">
        <div className="h-4 w-16 bg-muted/10 rounded" />
        <div className="h-4 w-16 bg-muted/10 rounded" />
      </div>
    </div>
  );
}
