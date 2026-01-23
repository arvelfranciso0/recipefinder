import { UrlTypes } from "@/types/url-types";

export const Urls: UrlTypes[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    requiresAuth: true,
    guestOnly: true,
  },
  {
    id: "recipe",
    label: "Recipes",
    href: "/recipe",
    requiresAuth: true,
  },
  {
    id: "favorites",
    label: "Favorites",
    href: "/favorites",
    requiresAuth: true,
  },
  {
    id: "login",
    label: "Log In",
    href: "/login",
    guestOnly: true,
  },
  {
    id: "signup",
    label: "Sign Up",
    href: "/signup",
    guestOnly: true,
  },
];

export const QuickLinks: UrlTypes[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    requiresAuth: true,
    guestOnly: true,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    requiresAuth: true,
  },
  {
    id: "notifications",
    label: "Notifications",
    href: "/notifications",
    requiresAuth: true,
  },
  {
    id: "account",
    label: "Account",
    href: "/acctount",
    requiresAuth: true,
  },
];

export const QuickCategories: UrlTypes[] = [
  {
    id: "healthy-eating",
    label: "Healthy Eating",
    href: "healthy-eating",
  },
  {
    id: "quick-meals",
    label: "Quick Meals",
    href: "quick-meals",
  },
  {
    id: "international",
    label: "International",
    href: "international",
  },
  {
    id: "holiday-specials",
    label: "Holiday Specials",
    href: "holiday-specials",
  },
  {
    id: "filipino-dishes",
    label: "Filipino Dishes",
    href: "filipino-dishes",
  },
];
