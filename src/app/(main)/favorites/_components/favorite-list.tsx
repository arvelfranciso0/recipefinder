"use client";

import Link from "next/link";

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
import { RecipeMealInterface } from "@/interface/recipe-interface";
import MealCard from "@/components/shared/mealCard";
import Pagination from "@/components/shared/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updatePage } from "@/libs/utils";
import { useState, useTransition } from "react";
import MealSelectionModal from "@/components/shared/mealSelectModal";
import { id } from "zod/locales";
import { useToast } from "@/context/toastContext";
import { toggleFavorite } from "../../meal/action";

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
];

interface sidebarCategoriesInterface {
  id: string;
  label: string;
  count: number;
  icon: LucideIcon;
  isActive: boolean;
  onSetActive: () => void;
}

export default function FavoritesList({
  favoriteMeals,
  favoriteCount,
  dinnerCount,
  breakfastCount,
  lunchCount,
}: {
  favoriteCount: number;
  dinnerCount: number;
  breakfastCount: number;
  lunchCount: number;
  favoriteMeals: RecipeMealInterface[];
}) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const sortBy = searchParams.get("sortBy") ?? "newest";
  const page = searchParams.get("page") ?? "1";
  const [favoriteData, setFavoriteData] = useState<{
    favoriteId: number;
    isFavorite: boolean;
    mealName: string;
    mealId: number;
  }>({ favoriteId: 0, isFavorite: false, mealName: "", mealId: 0 });

  const handleCategoryChange = (value: string, type: "sortBy") => {
    const params = new URLSearchParams(window.location.search);

    params.set(type, value);

    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleShowMealModal = async (
    e: React.MouseEvent,
    favoriteId: number | null,
    isFavorite?: boolean,
    mealName?: string,
    mealId?: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectionModalOpen(true);
    setFavoriteData({
      favoriteId: favoriteId as number,
      mealId: mealId as number,
      isFavorite: isFavorite as boolean,
      mealName: mealName as string,
    });
  };

  return (
    <div>
      <MealSelectionModal
        isOpen={selectionModalOpen}
        onClose={() => setSelectionModalOpen(false)}
        favoriteId={favoriteData.favoriteId}
        isFavorite={favoriteData.isFavorite}
        mealName={favoriteData.mealName}
        mealId={favoriteData.mealId}
      />
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
              {favoriteCount} Saved
            </span>
          </div>
        </div>
        {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
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
        </div> */}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar --- */}
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <SidebarItem
                label={"All Recipes"}
                count={dinnerCount + breakfastCount + lunchCount}
                icon={Utensils}
                id={"all-recipes"}
                isActive={false}
                onSetActive={() => console.log("Set active:", "all-recipes")}
              />
              <SidebarItem
                label={"Breakfast"}
                count={breakfastCount}
                icon={EggFried}
                id={"breakfast"}
                isActive={false}
                onSetActive={() => console.log("Set active:", "breakfast")}
              />
              <SidebarItem
                label={"Lunch"}
                count={lunchCount}
                icon={Hamburger}
                id={"lunch"}
                isActive={false}
                onSetActive={() => console.log("Set active:", "lunch")}
              />
              <SidebarItem
                label={"Dinner"}
                count={dinnerCount}
                icon={Utensils}
                id={"Beef"}
                isActive={false}
                onSetActive={() => console.log("Set active:", "dinner")}
              />
            </div>
          </div>

          {/* <div>
            <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-4">
              Prep Time
            </h3>
            <div className="space-y-3 px-2">
              <Checkbox id="time-15" checked={true}>
                <label
                  htmlFor="time-15"
                  className="text-sm font-medium text-foreground"
                >
                  Under 15 mins
                </label>
              </Checkbox>
              <Checkbox id="time-30" checked={false}>
                <label
                  htmlFor="time-30"
                  className="text-sm font-medium text-foreground"
                >
                  15 - 30 mins
                </label>
              </Checkbox>
              <Checkbox id="time-60" checked={false}>
                <label
                  htmlFor="time-60"
                  className="text-sm font-medium text-foreground"
                >
                  30+ mins
                </label>
              </Checkbox>
            </div>
          </div> */}

          <div>
            <h3 className="text-xs font-black text-muted uppercase tracking-widest mb-4">
              Sort By
            </h3>
            <div className="space-y-3 px-2">
              <Checkbox
                id="newest"
                checked={sortBy === "newest"}
                onClick={() => handleCategoryChange("newest", "sortBy")}
              >
                Newest
              </Checkbox>
              <Checkbox
                id="oldest"
                checked={sortBy === "oldest"}
                onClick={() => handleCategoryChange("oldest", "sortBy")}
              >
                Oldest
              </Checkbox>
              <Checkbox
                id="highest-rated"
                checked={sortBy === "highest-rated"}
                onClick={() => handleCategoryChange("highest-rated", "sortBy")}
              >
                Highest Rated
              </Checkbox>
            </div>
          </div>
        </aside>

        {/* --- Recipe Grid --- */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoriteMeals.map((recipe) => (
              <MealCard
                {...recipe}
                key={recipe.id}
                handleShowMealModal={handleShowMealModal}
              />
            ))}
          </div>

          <Pagination
            total={favoriteCount}
            currentList={Math.min(Number(page) * 10, favoriteCount)}
            handleLoadMore={() =>
              updatePage(Number(page) + 1, router, pathname)
            }
            handlePrevious={() =>
              updatePage(Number(page) - 1, router, pathname)
            }
          />
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
