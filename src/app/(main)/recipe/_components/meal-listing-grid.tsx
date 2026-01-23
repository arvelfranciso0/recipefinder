"use client";

import MealCard from "@/components/shared/mealCard";
import { Recipe } from "@/types/recipe-types";

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Teriyaki Chicken Casserole",
    tag: "Chicken",
    time: "35 min",
    rating: 4.8,
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
    rating: 5.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7bXoItinKBxohOP6w27Dzz9Ru7mcZtqj4baSfKMBv4m8xEMQHCqTyYpWGS9TKTOkvaqyEb1foVHcp7qk3KUTbapKf_xcphK3h9J9vpejo4t8rflXlSDNYHDX9T22ueU0L9GiPRklpVF6VwPQh41WBpcE9HD8D7G7yUgeR5mIEFBTSf8sKH8bkSyq8UinLqMMxBrD1VE5utF7FRIkQ2wgq2--26WFuHTIuh9IxXmKuBWbLkKtqZCxMYb-0xh5mm2o_DmDTsfo0jr9y",
    isNew: true,
    difficulty: "Difficult",
    tagColor: "text-primary",
  },
];

export const MealListingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
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
        />
      ))}
    </div>
  );
};
