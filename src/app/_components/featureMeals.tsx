"use client";

import MealCard from "@/components/shared/mealCard";

export default function FeaturedMeals() {
  const meals = [
    {
      title: "Honey Teriyaki Salmon",
      category: "Seafood",
      time: "25 mins",
      difficulty: "Easy",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCza3cqistU_j7B4jnlb7RKKWOnH_GkrvbR3n89SZq0QPE6KWPGgVsSNk_s1sXy665F5UU89EuAmG_zXq2HJHQl66eiyL2r_UR2aGQ-OpH68uMWdeJ87M-FdTFqk-SSC_EuXOucnSof49FjCDo_NNJiYLPNJSU2j6xrvOGT7GztC4_oTct_RDEiDj-gCjwym3Qd9Wvu2fRKB96dIixJl3yUOtgsgFs8xBQcoPpGnDxkUEAmZL8Amzl659VvDM31Y3jwGU_dL8rMXp1S",
      reviewers: 14,
    },
    {
      title: "Fresh Basil Pomodoro",
      category: "Vegetarian",
      time: "15 mins",
      difficulty: "Medium",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhJGytf9wBN2bLvyVfNQEsBV2OCdECyOmZoYGlzSu_VlZ_rFlHW_6ecJYa23o2Ny1x7ktOiB3F4M3GPerp377zxiwNQaMvpK0m7oHw848GFYe_SgXcdkCwTS0Avt5r413TQrQZ9s-MljEqKRjnVYzUMmytnWVDGszhNllvpCoDJVH5uuvPpBIOaX6XkAOX6EAL-gE0V1s8-rc8SzHQwRGA7srt0xLKzBhtKKf0PFNZfiAKfzQih_OLR1a1pol4NjL_7MdYADR-c2NF",
      reviewers: 10,
    },
    {
      title: "Lava Fudge Cake",
      category: "Dessert",
      time: "45 mins",
      difficulty: "Expert",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYy1wBOY7Cq0PLWVZ4aVj1YBVWz7wCQditg37Ik3RsNUIbEEdKi0xEma0hbbcT_ZhaYYAnknkhyO3-0K8LoKQfXgVaoEB0SMTAmh1jN1e7sfxs6wsfy6OocmX2olVNFBzkQ5HS5x_3MEoQIseVGdoRgKukmtHZKutllZ8Z_dAnhLNQmRQHTKIuXDcgEDOWS3H7i39DKIkaN88sVV8MG_T-HfQFpTXWfSYBESQQfGu7jp30rEFVSiLTcK5LbIDv4FcEUmSuriuOQm-A",
      reviewers: 25,
    },
  ];

  return (
    <section className="py-12">
      <div className="flex items-end justify-between px-2 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-charcoal dark:text-white">
            Featured Meals
          </h3>
          <p className="text-muted dark:text-gray-400">
            Hand-picked by our culinary editors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MealCard
          title="Honey Teriyaki Salmon"
          time="25 mins"
          difficulty="Easy"
          tag="Seafood"
          tagColor="text-primary"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuCza3cqistU_j7B4jnlb7RKKWOnH_GkrvbR3n89SZq0QPE6KWPGgVsSNk_s1sXy665F5UU89EuAmG_zXq2HJHQl66eiyL2r_UR2aGQ-OpH68uMWdeJ87M-FdTFqk-SSC_EuXOucnSof49FjCDo_NNJiYLPNJSU2j6xrvOGT7GztC4_oTct_RDEiDj-gCjwym3Qd9Wvu2fRKB96dIixJl3yUOtgsgFs8xBQcoPpGnDxkUEAmZL8Amzl659VvDM31Y3jwGU_dL8rMXp1S"
          likes="12"
          rating="3.1"
        />
        <MealCard
          title="Fresh Basil Pomodoro"
          time="15 mins"
          difficulty="Medium"
          tag="Vegetarian"
          tagColor="text-orange-500"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBhJGytf9wBN2bLvyVfNQEsBV2OCdECyOmZoYGlzSu_VlZ_rFlHW_6ecJYa23o2Ny1x7ktOiB3F4M3GPerp377zxiwNQaMvpK0m7oHw848GFYe_SgXcdkCwTS0Avt5r413TQrQZ9s-MljEqKRjnVYzUMmytnWVDGszhNllvpCoDJVH5uuvPpBIOaX6XkAOX6EAL-gE0V1s8-rc8SzHQwRGA7srt0xLKzBhtKKf0PFNZfiAKfzQih_OLR1a1pol4NjL_7MdYADR-c2NF"
          likes="8"
          rating="3.9"
        />
        <MealCard
          title="Lava Fudge Cake"
          time="45 mins"
          difficulty="Expert"
          tag="Dessert"
          tagColor="text-yellow-600"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDYy1wBOY7Cq0PLWVZ4aVj1YBVWz7wCQditg37Ik3RsNUIbEEdKi0xEma0hbbcT_ZhaYYAnknkhyO3-0K8LoKQfXgVaoEB0SMTAmh1jN1e7sfxs6wsfy6OocmX2olVNFBzkQ5HS5x_3MEoQIseVGdoRgKukmtHZKutllZ8Z_dAnhLNQmRQHTKIuXDcgEDOWS3H7i39DKIkaN88sVV8MG_T-HfQFpTXWfSYBESQQfGu7jp30rEFVSiLTcK5LbIDv4FcEUmSuriuOQm-A"
          likes="24"
          rating="4.5"
        />
      </div>
    </section>
  );
}
