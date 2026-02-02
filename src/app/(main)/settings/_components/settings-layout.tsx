"use client";

import { sideNavbar } from "@/libs/urls";
import { getActiveClass } from "@/libs/utils";
import { useAuth } from "@/providers/auth-providers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function SettingsSidebar() {
  const pathname = usePathname();
  const { refreshUser } = useAuth();

  const handleLogout = () => {
    axios
      .get("/api/auth/logout", { withCredentials: true })
      .then((res: AxiosResponse) => {
        refreshUser();
      })
      .catch((error: AxiosError) => {
        console.log("Error");
      });
  };
  return (
    <aside className="w-full lg:w-64 space-y-2">
      <nav className="bg-white dark:bg-white/5 rounded-2xl p-2 soft-shadow border border-gray-100 dark:border-white/10">
        {sideNavbar.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                getActiveClass(pathname, item.href)
                  ? "bg-primary/10 text-primary border-r-4 border-primary font-bold"
                  : "text-muted hover:bg-gray-50 dark:hover:bg-white/5 font-semibold"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="my-2 border-t border-gray-50 dark:border-white/5" />
        <button
          onClick={handleLogout}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}
