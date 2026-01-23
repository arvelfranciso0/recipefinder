"use client";

import { CookingPot, Play, PlayCircle } from "lucide-react";
import {
  IngredientList,
  RecipeHero,
  RecipeStats,
} from "../_components/recipe-details";

export default function RecipeDetailPage() {
  const ingredients = [
    { name: "Lasagna Sheets", amount: "12 sheets" },
    { name: "Ground Beef", amount: "500g" },
    { name: "Ricotta Cheese", amount: "400g" },
    { name: "Marinara Sauce", amount: "800ml" },
  ];

  const steps = [
    {
      title: "Prepare the Meat Sauce",
      desc: "In a large skillet, brown the ground beef over medium heat until no longer pink. Drain excess fat.",
    },
    {
      title: "Mix the Ricotta Base",
      desc: "In a medium bowl, combine the ricotta cheese with one egg and half of the parmesan cheese.",
    },
    {
      title: "Layering",
      desc: "Spread a thin layer of meat sauce in a 9x13 inch baking dish. Top with 3 lasagna sheets.",
    },
  ];

  return (
    <>
      <RecipeHero
        title="Classic Italian Lasagna"
        category="Italian"
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAqaQR6BJOXXlsa0d1krcynSRbzY4XRmuXQaQFzsRli3oSDOY9fpI9FGkT_H67HgjUpZ_wAlfcfXu-GUySYdix7-mOXx1Vs2s8F2OqP-TD61i8scxzmNkQZtlLNJb6OgZlN_f1VQrnjG-Okj-HmFjDu3CnS9RkMVVb06WKjAX7tT6LG7h_Mdb4HVFWvgpqa2xbdO3UjV4Y7kERIZNVgzsEhQLfKdcqlEcefoKv8536BVYSaQIQaJOJNG7UW1HCMey5LqZ6WM19DxMEm"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <IngredientList ingredients={ingredients} />

        <div className="lg:col-span-8 space-y-8">
          <RecipeStats />

          {/* Preparation Steps */}
          <section className="bg-background rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <CookingPot className="text-primary w-7 h-7" />
              Preparation Steps
            </h3>
            <div className="space-y-10">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-none">
                    <div className="size-10 rounded-full bg-primary text-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30">
                      {i + 1}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-foreground">
                      {step.title}
                    </h4>
                    <p className="text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Video Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3 px-2 text-foreground">
              <PlayCircle className="text-primary w-7 h-7" />
              Video Tutorial
            </h3>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm group cursor-pointer">
              <div className="absolute inset-0 bg-foreground-900/40 flex items-center justify-center z-10">
                <div className="size-20 bg-background/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-primary-foreground/50 group-hover:scale-110 transition-transform">
                  <Play className="text-primary-foreground w-10 h-10 fill-current" />
                </div>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdGIxY00v-KBSFAGSMSDftj3yQsfEOxtTGOkmt3cz73A8PeKP_sGAPS5uvloZGRG6JIEHEv2pzoKnl5wcKBbzWg1sVcZ230iVCxjk7K7BxeJ8nKOkeqdwi6UV-kdRL_dHlAEGnYO-qjPntgbdJ2xgtl5skndjlw4VF8T7WLOzSsJJgrZAoo9Sj_ke4b-QOYwQGh-pWsQnhkWpXI2IAI3F3jABgDoWW-94lHt_nM0pUX5VEEPnZKVWswsIEk6XL8YClMzdID4zT9SeE"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
