import { HeartOff, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function NoFavoritesFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 text-center max-w-xl mx-auto">
      {/* Decorative Icon Group */}
      <div className="relative mb-8 group">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-50 group-hover:opacity-80 transition-opacity" />

        <div className="relative size-32 bg-white dark:bg-white/5 border border-muted/10 rounded-[2.5rem] flex items-center justify-center text-muted/40 shadow-2xl transition-transform group-hover:scale-105 duration-500">
          <HeartOff size={56} strokeWidth={1.5} className="text-muted/20" />

          {/* Small floating "plus" or sparkle for context */}
          <div className="absolute -top-2 -right-2 p-2 bg-primary rounded-2xl text-white shadow-lg shadow-primary/40 animate-bounce">
            <Sparkles size={16} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="space-y-3 mb-10">
        <h2 className="text-3xl font-black text-foreground tracking-tight">
          Your Cookbook is Empty
        </h2>
        <p className="text-muted text-lg font-medium leading-relaxed">
          You haven't saved any recipes to your favorites yet. Start exploring
          to find your next favorite meal!
        </p>
      </div>

      {/* CTA Button */}
      <Link href="/meal" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto flex items-center justify-center gap-3 ">
          Browse All Recipes
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </Link>

      {/* Subtle Tip */}
      <div className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 bg-muted/5 px-4 py-2 rounded-full border border-muted/5">
        <span className="text-primary italic">Pro Tip:</span> Tap the heart icon
        on any recipe to save it here
      </div>
    </div>
  );
}
