import { FlagOff, Hash, Home, Search } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function InvalidRecipeId() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* Visual Indicator */}
      <div className="relative mb-6">
        <div className="size-24 bg-muted/5 rounded-3xl rotate-12 flex items-center justify-center text-muted/20 absolute inset-0" />
        <div className="size-24 bg-white dark:bg-white/5 border border-muted/20 rounded-3xl flex items-center justify-center text-primary shadow-xl relative z-10">
          <Hash size={40} strokeWidth={2.5} />
        </div>
      </div>

      {/* Textual Context */}
      <div className="space-y-2 mb-10">
        <h2 className="text-3xl font-black text-foreground tracking-tight">
          Invalid Recipe ID
        </h2>
        <p className="text-muted max-w-xs mx-auto font-medium leading-relaxed">
          The ID provided in the URL isn't a valid format. Recipe IDs should be
          numeric.
        </p>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        <Link href="/meal" className="w-full">
          <Button className="w-full flex items-center justify-center gap-2 ">
            <Search size={18} />
            Browse Recipes
          </Button>
        </Link>

        <Link href="/home" className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 "
          >
            <Home size={18} />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
