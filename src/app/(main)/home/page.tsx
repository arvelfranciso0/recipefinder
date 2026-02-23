import Categories from "../_components/categories";
import FeaturedMeals from "../_components/feature-meals";
import Hero from "../_components/hero";
import { getFeaturedMeals } from "./server";

export default async function Home() {
  const meal = await getFeaturedMeals();
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Featured Meals Grid */}
      <FeaturedMeals featureMeals={meal} />

      {/* TODO: This feature will add in the future */}
      {/* <Newsletter /> */}
    </>
  );
}
