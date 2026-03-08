import Button from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* Icon Wrapper */}
      <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <ChefHat className="text-primary w-12 h-12" />
      </div>

      {/* Text Content */}
      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
        Recipe Not Found
      </h2>
      <p className="text-muted max-w-md mb-8 text-lg">
        We couldn't find the recipe you're looking for. It might have been
        removed, or the link you followed is broken.
      </p>

      {/* Call to Action */}
      <div className="flex gap-4">
        <Button variant="ghost" className="rounded-2xl px-8">
          <Link href="/meal">Browse All Recipes</Link>
        </Button>
      </div>
    </div>
  );
}
