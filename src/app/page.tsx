"use client";

import Hero from "./_components/hero";
import Categories from "./_components/categories";
import FeaturedMeals from "./_components/featureMeals";
import Newsletter from "./_components/newsLetter";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Featured Meals Grid */}
      <FeaturedMeals />

      {/* Newsletter CTA */}
      <Newsletter />
    </>
  );
}
