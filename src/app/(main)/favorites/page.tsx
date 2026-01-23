"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Beef,
  ChevronRight,
  EggFried,
  Hamburger,
  LucideIcon,
  Utensils,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/select";
import { Recipe } from "@/types/recipe-types";
import MealCard from "@/components/shared/mealCard";
import Pagination from "@/components/shared/pagination";
import { useMemo, useState } from "react";

const FAVORITE_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Teriyaki Chicken Casserole",
    tag: "Chicken",
    time: "35 min",
    rating: 4.8,
    isFavorite: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBR3Hzw4f8kc0f9-0KRdt0KTH0V6mdA4ut1bXKybVns1aI_MyqCvv1PtSxLNUyApk46KEGA6EqSCjslflG1IWzlgGvNGVcFQUoona1SHR6ee3Q38XLuKCmMpUbq3f3RZBkVpZ2weD9YYvUNaVyHVroKslVE-GGGe9ioVNkQeUi9QqwofZUo_jLQQFX3xfHLsp6pQac9h1m9oWB5-_PhWaWVSuLWfdCbjSSaErquXcxCRjHq5_V_cvbJhyXpuv8XApI2DrhwAyM5YisK",
    isPopular: true,
    difficulty: "Easy",
    tagColor: "text-primary",
  },
  {
    id: 2,
    title: "Spicy Arrabiata Pasta",
    tag: "Pasta",
    time: "20 min",
    isFavorite: true,
    rating: 4.9,
    difficulty: "Difficult",
    tagColor: "text-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFSp7mGpvVRWIF-Hnm29JvZzKTsKDd55o0_cEloDVPGfTwGem2pSsS72kIziiHjhYPkIbVjvUVblLaTHczKY0bVtFos6ctA0le-MArI2rBrBOXOEyThGswiA4MkAlO_KjvylnjiuZ4zqhJuehCYTn8Nb_vwqgn-kT9lhmvTvtyJzZ6N6boA-d1d-V8R1lKwa-kJeNp1k1-dtKyZofmHkB_WED53OFSyKjky43LzPkb1GWFPkWxV1mg_IXGyC2TupxFX1h05eCWWP83",
  },
  {
    id: 3,
    title: "Beef and Mustard Pie",
    tag: "Beef",
    time: "1h 15m",
    isFavorite: true,
    rating: 4.7,
    difficulty: "Difficult",
    tagColor: "text-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACMzCKMe17geSw8M7rLaW5wi8zeGz-xfe9C73FkOQ-zrRnPWfALPOJiDytNluuWZrt3eoqAdRsA2aeBMerbuLtAQdCB2RpSHCzFcFjZJLgvR2m70hCBfn2X-B61-Tq8gG4evxuqxs6KA8NiLa48N6Us7Jhh5lZk9isThjnkbO8SF7IJlSQUgoBki_2EzbhwTsryeGhBMQe43Bc31_6yQIgzNNRpt7aI1h4HZJT41MN4PIULt5MQm5wSopsjHhNX6r2-3hitVtCszB7",
  },
  {
    id: 4,
    title: "Chocolate Gateau",
    tag: "Dessert",
    time: "45 min",
    isFavorite: true,
    rating: 5.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7bXoItinKBxohOP6w27Dzz9Ru7mcZtqj4baSfKMBv4m8xEMQHCqTyYpWGS9TKTOkvaqyEb1foVHcp7qk3KUTbapKf_xcphK3h9J9vpejo4t8rflXlSDNYHDX9T22ueU0L9GiPRklpVF6VwPQh41WBpcE9HD8D7G7yUgeR5mIEFBTSf8sKH8bkSyq8UinLqMMxBrD1VE5utF7FRIkQ2wgq2--26WFuHTIuh9IxXmKuBWbLkKtqZCxMYb-0xh5mm2o_DmDTsfo0jr9y",
    isNew: true,
    difficulty: "Difficult",
    tagColor: "text-primary",
  },
];

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Italian", value: "italian" },
  { label: "Seafood", value: "seafood" },
  { label: "Vegetarian", value: "vegetarian" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rated", value: "rating" },
  { label: "Quickest", value: "prep_time" },
];

interface sidebarCategoriesInterface {
  id: string;
  label: string;
  count: number;
  icon: LucideIcon;
  isActive: boolean;
  onSetActive: () => void;
}

const sidebar_categories = [
  {
    id: "all-recipes",
    label: "All Recipes",
    count: 12,
    icon: Utensils,
  },
  {
    id: "breakfast",
    label: "Breakfast",
    count: 12,
    icon: EggFried,
  },
  {
    id: "lunch",
    label: "Lunch",
    count: 12,
    icon: Hamburger,
  },
  {
    id: "dinner",
    label: "Dinner",
    count: 12,
    icon: Beef,
  },
];

export default function FavoritesPage() {
  const [isActive, setIsActive] = useState("all-recipes");
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <nav className="flex items-center gap-2 text-sm  text-muted mb-3">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <ChevronRight />
            <span className="font-medium">My Favorites</span>
          </nav>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-black  tracking-tight">
              My Favorites
            </h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold mt-2">
              12 Saved
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none sm:min-w-40">
            <CustomSelect
              options={categories}
              defaultValue="Breakfast"
              onSelect={(val) => console.log("Selected:", val)}
            />
          </div>
          <div className="flex-1 sm:flex-none sm:min-w-35">
            <CustomSelect
              options={SORT_OPTIONS}
              defaultValue="Newest"
              onSelect={(val) => console.log("Selected:", val)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar --- */}
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              {sidebar_categories.map((item) => (
                <SidebarItem
                  key={item.id}
                  label={`${item.label}`}
                  count={item.count}
                  icon={item.icon}
                  id={item.id}
                  isActive={isActive === item.id}
                  onSetActive={() => setIsActive(item.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-4">
              Prep Time
            </h3>
            <div className="space-y-3 px-2">
              <Checkbox id="time-15">Under 15 mins</Checkbox>
              <Checkbox id="time-30">15 - 30 mins</Checkbox>
              <Checkbox id="time-60">30+ mins</Checkbox>
            </div>
          </div>
        </aside>

        {/* --- Recipe Grid --- */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {FAVORITE_RECIPES.map((recipe) => (
              <MealCard
                id={recipe.id}
                key={recipe.id}
                title={recipe.title}
                time={recipe.time}
                difficulty={recipe.difficulty}
                tag={recipe.tag}
                tagColor={recipe.tagColor}
                image={recipe.image}
                rating={recipe.rating}
                isFavorite={recipe.isFavorite}
              />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  label,
  count,
  icon: Icon,
  id,
  isActive,
  onSetActive,
}: sidebarCategoriesInterface) {
  return (
    <button
      id={id}
      onClick={onSetActive}
      className={`cursor-pointer w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${
        isActive
          ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
          : " font-semibold hover:bg-white hover:text-primary"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="material-symbols-outlined text-xl">{<Icon />}</span>{" "}
        {label}
      </span>
      <span className={`text-xs ${isActive ? "text-white" : "text-muted"}`}>
        {count}
      </span>
    </button>
  );
}
