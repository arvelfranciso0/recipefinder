"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { ChefHat } from "@components/icons/chef-hat";
import { usePathname } from "next/navigation";
import { InputField } from "../ui/input";
import { getActiveClass } from "@/libs/utils";
import { useAuth } from "@/providers/auth/providers";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md ">
      <div className="max-w-7xl md:px-10 px-3 mx-auto py-3 flex items-center justify-between">
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-8">
          <Link href="/home" className="flex items-center gap-3 group">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <ChefHat />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground ">
              Recipe<span className="text-primary">Finder</span>
            </h1>
          </Link>
          {/* <div className="hidden md:block w-full">
            <InputField
              placeholder="Search meal..."
              className="w-100 border-none" // Clean up internal borders
              icon={Search}
              id="searchIngredients"
            />
          </div> */}
        </div>
        {/* Center/Right Section: Navigation */}
        <nav className="flex items-center gap-4 lg:gap-8">
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold mr-4">
            <Link
              href="/home"
              className={`${getActiveClass(pathname, "/") ? "text-primary" : "text-foreground  hover:text-primary"}  `}
            >
              Home
            </Link>
            <Link
              href="/meal"
              className={`${getActiveClass(pathname, "/meal") ? "text-primary" : "text-foreground  hover:text-primary"} `}
            >
              Meals
            </Link>
            <Link
              href={`/favorites`}
              className={`${getActiveClass(pathname, "/favorites") ? "text-primary" : "text-foreground  hover:text-primary"} `}
            >
              Favorites
            </Link>
          </div>

          {/* Conditional Auth UI */}
          <div className="flex items-center gap-3 border-l  pl-6">
            <Link href={"/settings/profile"}>
              <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="User Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCenLArdCyyjE8adbWVx93RLRZPNw7uG4HbYOXZxGvro5Rc8y_wefDHOEQ9ZK4AIDL3urC5Y0ez0M-VB9Viota7Wthxq1_rZggI5Wues1UNuseJOoOuvLp-blmzyDEud45RwJiRxSSrVgVQVdIw8L0ppUQ_0Q4OcxaBFP5jxH-pd34CU51l5e3oPjjz2FO6nfNKFETr76H6FZp5K9UPf_W_NZO6dm2PJ7hYtDMr5-sc19mH0x6HqFP7S-vbyzPAmhVzMsbJXBua_6mo"
                    alt="User Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
