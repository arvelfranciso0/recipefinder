"use client";

import Button from "../ui/button";

export default function Pagination() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 gap-4">
      <p className="text-sm font-medium text-[#73816a] dark:text-gray-400">
        Showing 8 of 542 recipes
      </p>
      <div className="w-48 h-1 bg-[#e0e3dd] dark:bg-white/10 rounded-full overflow-hidden">
        <div className="w-1/4 h-full bg-primary rounded-full"></div>
      </div>
      <Button variant={"outline"}>Load More Recipes</Button>
    </div>
  );
}
