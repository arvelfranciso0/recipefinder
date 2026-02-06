import { ChefHat, ArrowRight, Database } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 ">
        <section className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column: Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Logo - Now the first item in the Hero text stack */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-[#65a338]/20">
                <ChefHat size={24} />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Recipe<span className="text-primary">Finder</span>
              </h1>
            </div>

            {/* Credit Badge for TheMealDB */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm transition-all hover:bg-slate-50">
              <Database size={14} className="text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                Powered by <span className="text-foreground">TheMealDB</span>
              </p>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black leading-tight italic">
              Cook like a pro <br />
              <span className="text-primary not-italic">effortlessly.</span>
            </h2>

            <p className="text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Find the perfect meal for any occasion. Filter by ingredients you
              already have, dietary needs, or preparation time.
            </p>

            {/* Centralized Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/signup"
                className="px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-bold  flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Sign Up Now <ArrowRight size={20} />
              </Link>
              <Link
                href="/login"
                className="px-5 py-3 bg-background border-2 border-slate-200 text-foreground rounded-2xl font-bold text-lg hover:text-primary transition-all flex items-center justify-center active:scale-95"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Block */}
          <div className="flex-1 w-full max-w-xl relative">
            <div className="aspect-square bg-white rounded-[3rem] shadow-2xl overflow-hidden border-12 border-white relative">
              <div
                className="absolute cursor-pointer bg-slate-200 inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCza3cqistU_j7B4jnlb7RKKWOnH_GkrvbR3n89SZq0QPE6KWPGgVsSNk_s1sXy665F5UU89EuAmG_zXq2HJHQl66eiyL2r_UR2aGQ-OpH68uMWdeJ87M-FdTFqk-SSC_EuXOucnSof49FjCDo_NNJiYLPNJSU2j6xrvOGT7GztC4_oTct_RDEiDj-gCjwym3Qd9Wvu2fRKB96dIixJl3yUOtgsgFs8xBQcoPpGnDxkUEAmZL8Amzl659VvDM31Y3jwGU_dL8rMXp1S')",
                }}
              ></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
