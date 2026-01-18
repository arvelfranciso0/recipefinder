"use client";

import { Bell, ChefHat, Heart, LogOut, Search } from "lucide-react";
import Link from "next/link";
import Button from "../ui/button";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e0e3dd] dark:border-white/10">
      <div className="max-w-300 mx-auto px-4 lg:px-10 py-3 flex items-center justify-between">
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ChefHat className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-charcoal dark:text-white">
              Recipe<span className="text-primary">Finder</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center bg-background-light dark:bg-white/5 rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all w-64 lg:w-80">
            <Search className="text-[#73816a] w-5 h-5" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 placeholder:text-[#73816a] outline-none dark:text-white"
              placeholder="Search ingredients..."
              type="text"
            />
          </div>
        </div>

        {/* Center/Right Section: Navigation */}
        <nav className="flex items-center gap-4 lg:gap-8">
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold mr-4">
            <Link href="/" className="text-primary">
              Home
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  href="/recipe"
                  className="hover:text-primary transition-colors dark:text-gray-300"
                >
                  Recipes
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors dark:text-gray-300"
                >
                  My Feed
                </Link>
              </>
            )}
          </div>

          {/* Conditional Auth UI */}
          <div className="flex items-center gap-3 border-l border-[#e0e3dd] dark:border-white/10 pl-6">
            {!isLoggedIn ? (
              /* --- GUEST VIEW --- */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="text-sm font-bold text-charcoal dark:text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="text-sm font-bold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 shadow-md shadow-primary/20 active:scale-95 transition-all"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              /* --- LOGGED IN VIEW --- */
              <div className="flex items-center gap-3 lg:gap-5">
                {/* Favorites with Indicator */}
                <button className="p-2 text-[#73816a] hover:bg-background-light dark:hover:bg-white/5 rounded-full transition-colors relative group">
                  <Heart className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                  <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
                </button>

                {/* Notifications */}
                <button className="hidden sm:block p-2 text-[#73816a] hover:bg-background-light dark:hover:bg-white/5 rounded-full transition-colors">
                  <Bell className="w-6 h-6" />
                </button>

                {/* Profile Dropdown Simulation */}
                <div className="flex items-center gap-3 ml-2">
                  <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCenLArdCyyjE8adbWVx93RLRZPNw7uG4HbYOXZxGvro5Rc8y_wefDHOEQ9ZK4AIDL3urC5Y0ez0M-VB9Viota7Wthxq1_rZggI5Wues1UNuseJOoOuvLp-blmzyDEud45RwJiRxSSrVgVQVdIw8L0ppUQ_0Q4OcxaBFP5jxH-pd34CU51l5e3oPjjz2FO6nfNKFETr76H6FZp5K9UPf_W_NZO6dm2PJ7hYtDMr5-sc19mH0x6HqFP7S-vbyzPAmhVzMsbJXBua_6mo"
                      alt="User Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Logout Action (for demo purposes) */}
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                    }}
                    className="p-2 text-[#73816a] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-all"
                    title="Log Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
