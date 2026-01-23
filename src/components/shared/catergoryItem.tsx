"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface CategoryItemProps {
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  label: string;
}

export default function CategoryItem({
  icon: Icon,
  colorClass,
  bgClass,
  label,
}: CategoryItemProps) {
  return (
    <Link href={`/recipe?category=${label.toLowerCase()}`}>
      <div className="flex-none w-32 group cursor-pointer">
        <div
          className={`h-32 rounded-3xl ${bgClass} flex items-center justify-center transition-transform group-hover:-translate-y-2`}
        >
          <Icon className={`w-10 h-10 ${colorClass}`} />
        </div>
        <p className="mt-3 text-center font-bold text-sm text-muted">{label}</p>
      </div>
    </Link>
  );
}
