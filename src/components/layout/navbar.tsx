"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { ChefHat } from "@components/icons/chef-hat";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-providers";
import { Url } from "next/dist/shared/lib/router/router";
import { InputField } from "../ui/input";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isActive = (path: Url): string => {
    return pathname === path
      ? "text-primary "
      : "text-foreground  hover:text-primary";
  };
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md ">
      <div className="max-w-7xl md:px-10 px-3 mx-auto py-3 flex items-center justify-between">
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <ChefHat />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground ">
              Recipe<span className="text-primary">Finder</span>
            </h1>
          </Link>
          <div className="hidden md:block w-full">
            <InputField
              className=""
              placeholder="Search ingredients..."
              type="text"
              icon={Search}
              id="search"
            />
          </div>
        </div>
        {/* Center/Right Section: Navigation */}
        <nav className="flex items-center gap-4 lg:gap-8">
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold mr-4">
            <Link href="/" className={`${isActive("/")}  `}>
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link href="/recipe" className={`${isActive("/recipe")} `}>
                  Recipes
                </Link>
                <Link
                  href={`/favorites`}
                  className={`${isActive("/favorites")} `}
                >
                  Favorites
                </Link>
              </>
            )}
          </div>

          {/* Conditional Auth UI */}
          <div className="flex items-center gap-3 border-l  pl-6">
            {!isAuthenticated ? (
              /* --- GUEST VIEW --- */
              <div className="flex items-center gap-2">
                <Link
                  href={"/login"}
                  className="text-sm font-bold text-foreground bg-primary-foreground px-5 py-2 shadow-md  rounded-lg transition-all"
                >
                  Log In
                </Link>
                <Link
                  href={"/signup"}
                  className="text-sm font-bold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 active:scale-95 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              /* --- LOGGED IN VIEW --- */
              <div className="flex items-center gap-3 lg:gap-5">
                {/* Profile Dropdown Simulation */}
                <div className="flex items-center gap-3 ml-2">
                  <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCenLArdCyyjE8adbWVx93RLRZPNw7uG4HbYOXZxGvro5Rc8y_wefDHOEQ9ZK4AIDL3urC5Y0ez0M-VB9Viota7Wthxq1_rZggI5Wues1UNuseJOoOuvLp-blmzyDEud45RwJiRxSSrVgVQVdIw8L0ppUQ_0Q4OcxaBFP5jxH-pd34CU51l5e3oPjjz2FO6nfNKFETr76H6FZp5K9UPf_W_NZO6dm2PJ7hYtDMr5-sc19mH0x6HqFP7S-vbyzPAmhVzMsbJXBua_6mo"
                      alt="User Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
