import { CookingPot, PlayCircle, ExternalLink, Info } from "lucide-react";
import {
  IngredientList,
  RecipeHero,
  RecipeStats,
} from "../_components/recipe-details";
import { TheMealDbApiService } from "@/services/meal.service";
import { getYoutubeEmbedUrl, mapMealDetail } from "@/libs/utils";

export default async function RecipeDetailPage(props: PageProps<"/meal/[id]">) {
  const { id } = await props.params;
  const recipeDetailsResult = await TheMealDbApiService.lookupMealById(id);
  const mapResultRecipeDetails = await mapMealDetail(recipeDetailsResult[0]);
  const embedUrl = getYoutubeEmbedUrl(mapResultRecipeDetails.youtube);

  return (
    <>
      <RecipeHero
        title={mapResultRecipeDetails.name}
        category={mapResultRecipeDetails.category ?? "Unknown"}
        image={mapResultRecipeDetails.image ?? ""}
        area={mapResultRecipeDetails.area ?? "Unknown"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <IngredientList ingredients={mapResultRecipeDetails.ingredients} />

        <div className="lg:col-span-8 space-y-8">
          <section className="dark:bg-white/5 rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <CookingPot className="text-primary w-7 h-7" />
              Preparation Steps
            </h3>
            <div className="space-y-10">
              {mapResultRecipeDetails.instructions.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-none">
                    <div className="size-10 rounded-full bg-primary text-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30">
                      {i + 1}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3 px-2 text-foreground">
              <PlayCircle className="text-primary w-7 h-7" />
              Video Tutorial
            </h3>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm group">
              {embedUrl && (
                <iframe
                  src={embedUrl}
                  title="Recipe Video"
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
            </div>
          </section>

          {/* --- TheMealDB Credit Placeholder --- */}
          <div className="mt-6 flex items-center justify-end px-2">
            <div className="flex items-center gap-2 py-2 px-4 bg-primary/5 dark:bg-primary/10 rounded-full border border-primary/10 group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                Source:
                <a
                  href="https://www.themealdb.com"
                  target="_blank"
                  className="ml-1 text-primary hover:text-primary-dark transition-colors"
                >
                  TheMealDB API
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
