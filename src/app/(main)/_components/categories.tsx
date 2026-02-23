"use client";

import { useRef, useState, useEffect } from "react";
import CategoryItem from "@/components/shared/catergoryItem";
import { categories } from "@/libs/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  // Update arrow visibility based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 group/section">
      {/* Header stays standard */}
      <div className="flex items-end justify-between px-2 mb-8">
        <div>
          <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
            Browse Categories
          </h3>
          <p className="text-muted font-medium">
            Explore by meal type or cuisine
          </p>
        </div>
        <Link
          href="/recipe"
          className="text-primary font-black text-sm flex items-center gap-1 hover:underline group/link"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* The Netflix Container */}
      <div className="relative overflow-hidden">
        {/* Left Control - Netflix Style */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute cursor-pointer left-0 top-0 bottom-4 z-30 w-12 flex items-center justify-center bg-background/40 hover:bg-background/80 backdrop-blur-[2px] text-primary transition-all duration-300 group/btn"
            aria-label="Scroll left"
          >
            <ChevronLeft
              size={40}
              className="group-hover/btn:scale-125 transition-transform"
            />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-4 px-2 snap-x snap-mandatory scroll-smooth"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="snap-start shrink-0 first:pl-12 last:pr-12"
            >
              <CategoryItem
                label={category.label}
                icon={category.icon}
                bgClass={category.bgClass}
                colorClass={category.colorClass}
              />
            </div>
          ))}
        </div>

        {/* Right Control - Netflix Style */}
        <button
          onClick={() => scroll("right")}
          className="absolute cursor-pointer right-0 top-0 bottom-4 z-30 w-12 flex items-center justify-center bg-background/40 hover:bg-background/80 backdrop-blur-[2px] text-primary transition-all duration-300 group/btn"
          aria-label="Scroll right"
        >
          <ChevronRight
            size={40}
            className="group-hover/btn:scale-125 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
