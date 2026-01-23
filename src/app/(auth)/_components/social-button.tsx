"use client";

import { Fb } from "@/components/icons/fb";
import { Google } from "@/components/icons/google";

type SocialProviderTypes = {
  provider: "Google" | "Facebook";
};

export default function SocialButton({ provider }: SocialProviderTypes) {
  return (
    <button className="flex cursor-pointer items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:dark:text-background transition-colors">
      {provider === "Google" ? <Google /> : <Fb />}
      <span className="text-sm font-bold text-foreground">{provider}</span>
    </button>
  );
}
