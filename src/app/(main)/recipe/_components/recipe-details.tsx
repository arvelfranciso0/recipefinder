"use client";
import Button from "@/components/ui/button";
import {
  ShoppingBasket,
  Clock,
  Flame,
  ChevronRight,
  PlayCircle,
  Check,
  Play,
  Heart,
  ChefHat,
  Printer,
  Download,
} from "lucide-react";

// --- Sub-component: Hero Section ---
const RecipeHero = ({
  title,
  category,
  image,
}: {
  title: string;
  category: string;
  image: string;
}) => (
  <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-2xl mb-8 group">
    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute bottom-8 left-8 z-20 text-primary-foreground">
      <div className="flex gap-2 mb-3">
        <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {category}
        </span>
        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Main Dish
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-white/80 font-medium">
        Authentic slow-cooked meat sauce & creamy ricotta
      </p>
    </div>
    <div className="absolute top-6 right-6 z-20">
      <button className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-full hover:scale-110 transition-transform shadow-lg group">
        <Heart className="w-6 h-6 text-primary  group-hover:fill-primary transition-all" />
      </button>
    </div>
  </div>
);

// --- Sub-component: Stats ---
const RecipeStats = () => (
  <div className="flex flex-wrap gap-4">
    {[
      {
        icon: <Clock className="w-5 h-5" />,
        label: "Prep Time",
        value: "20 min",
      },
      {
        icon: <ChefHat className="w-5 h-5" />,
        label: "Cook Time",
        value: "45 min",
      },
      {
        icon: <Flame className="w-5 h-5" />,
        label: "Calories",
        value: "650 kcal",
      },
    ].map((stat, i) => (
      <div
        key={i}
        className="flex-1 bg-background p-4 rounded-2xl shadow-sm flex flex-col items-center"
      >
        <div className="text-primary mb-1">{stat.icon}</div>
        <span className="text-sm text-muted font-bold uppercase tracking-wider">
          {stat.label}
        </span>
        <span className="text-lg font-bold text-foreground">{stat.value}</span>
      </div>
    ))}
  </div>
);

// --- Sub-component: Ingredients ---
const IngredientList = ({ ingredients }: { ingredients: any[] }) => (
  <aside className="lg:col-span-4 space-y-6">
    <div className="bg-background rounded-2xl p-6 shadow-sm  sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <ShoppingBasket className="text-primary w-6 h-6" />
          Ingredients
        </h3>
        <span className="text-xs font-bold text-muted uppercase tracking-widest">
          8 Servings
        </span>
      </div>
      <ul className="space-y-4">
        {ingredients.map((ing, i) => (
          <li
            key={i}
            className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="size-5 rounded-md border-2 border-primary/30 group-hover:border-primary transition-colors cursor-pointer flex items-center justify-center">
                <Check className="text-primary w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {ing.name}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground/40">
              {ing.amount}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant={"primary"}
        className="w-full mt-8 flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download Recipe
      </Button>
    </div>
  </aside>
);

export { RecipeHero, RecipeStats, IngredientList };
