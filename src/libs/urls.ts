import { sideNavbarInterface, UrlInterface } from "@/interface/url-interface";
import { Bell, Settings, Sliders, User } from "lucide-react";

export const QuickLinks: UrlInterface[] = [
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
  // {
  //   id: "notifications",
  //   label: "Notifications",
  //   href: "/notifications",
  //   requiresAuth: true,
  // },
  {
    id: "account",
    label: "Account",
    href: "/acctount",
    requiresAuth: true,
  },
];

export const QuickCategories: UrlInterface[] = [
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

export const sideNavbar: sideNavbarInterface[] = [
  { icon: User, label: "Profile", href: "/settings/profile", active: false },
  { icon: Settings, label: "Account", href: "/settings/account", active: true },
  // {
  //   icon: Sliders,
  //   label: "Preferences",
  //   href: "/settings/preference",
  //   active: false,
  // },
  // {
  //   icon: Bell,
  //   label: "Notifications",
  //   href: "/settings/notification",
  //   active: false,
  // },
];
