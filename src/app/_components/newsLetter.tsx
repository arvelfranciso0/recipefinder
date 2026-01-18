"use client";

import Button from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="mt-12 bg-primary/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-md">
        <h3 className="text-3xl font-black text-charcoal dark:text-white">
          Get weekly recipes in your inbox.
        </h3>
        <p className="mt-4 text-muted dark:text-gray-400">
          Join 15,000+ food lovers and get our exclusive weekly meal plan and
          kitchen tips.
        </p>
      </div>
      <div className="w-full max-w-sm flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 rounded-xl border-none focus:ring-2 focus:ring-primary/20 py-3 px-4 text-sm soft-shadow outline-none text-charcoal"
          placeholder="Your email address"
          type="email"
        />
        <Button className="px-6 py-3 rounded-xl shadow-lg">Subscribe</Button>
      </div>
    </section>
  );
}
