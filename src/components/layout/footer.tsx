import { Camera, Globe, Video } from "lucide-react";
import Link from "next/link";
import { ChefHat } from "../icons/chef-hat";
import { QuickCategories, QuickLinks } from "@/libs/urls";
import { categoriesData } from "@/libs/data";

export default function Footer() {
  return (
    <footer className=" dark:bg-transparent border-t border-gray-100 dark:border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="#" className="flex items-center gap-2 mb-6">
              <ChefHat />
              <h1 className="text-xl font-extrabold tracking-tight text-foreground">
                Recipe<span className="text-primary">Finder</span>
              </h1>
            </Link>
            <p className="text-muted  text-sm leading-relaxed">
              Making home cooking accessible and fun for everyone, one recipe at
              a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 dark:text-muted">
              Quick Links
            </h5>
            <ul className="space-y-4 text-sm text-muted ">
              {QuickLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`${item.href}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 dark:text-muted">
              Categories
            </h5>
            <ul className="space-y-4 text-sm text-muted ">
              {categoriesData.slice(1, 7).map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/recipe?${item.value}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 dark:text-muted">
              Follow Us
            </h5>
            <div className="flex gap-4">
              {[Globe, Video, Camera].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full  dark:bg-white/5 flex items-center justify-center text-muted hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-muted">
          <p>© 2024 RecipeFinder. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
