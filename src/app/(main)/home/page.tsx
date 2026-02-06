"use client";

import Categories from "../_components/categories";
import FeaturedMeals from "../_components/feature-meals";
import Hero from "../_components/hero";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Featured Meals Grid */}
      <FeaturedMeals />

      {/* TODO: This feature will add in the future */}
      {/* <Newsletter /> */}
    </>
  );
}
