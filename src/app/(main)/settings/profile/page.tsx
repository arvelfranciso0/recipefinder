"use client";

import Button from "@/components/ui/button";
import { ProfileForm } from "./_components/profile-form";
import { ThemeSelector } from "@/components/shared/themeSelector";
import { getUserProfile } from "./server";
import { ArrowRight, LockKeyhole, UserCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/auth/providers";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-6 bg-white dark:bg-white/5 border border-dashed border-muted/30 rounded-[3rem] text-center">
        <div className="relative mb-6">
          <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary animate-pulse">
            <LockKeyhole size={32} />
          </div>
          <div className="absolute -bottom-1 -right-1 size-8 bg-background border-4 border-background rounded-full flex items-center justify-center text-muted">
            <UserCircle size={18} />
          </div>
        </div>

        <h2 className="text-2xl font-black text-foreground mb-2">
          Profile Unavailable
        </h2>
        <p className="text-muted max-w-xs mb-8 font-medium leading-relaxed">
          Please sign in to your account to manage your personal details and
          preferences.
        </p>

        <Link href="/login">
          <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 rounded-2xl px-8 py-6 font-bold shadow-xl shadow-primary/20 transition-all group">
            Sign In to Account
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </Link>
      </section>
    );
  }
  return (
    <section className="flex-1 space-y-8">
      <div>
        <h2 className="text-3xl font-black text-foreground">User Settings</h2>
        <p className="text-muted mt-1">
          Manage your account information and preferences.
        </p>
      </div>

      <ProfileForm
        fullName={user.fullName}
        birthdate={user.birthday ?? ""}
        bio={user.bio ?? ""}
        email={user.email}
        avatarUrl={user.avatarUrl}
        avatarPublicId={user.avatarPublicId}
      />
      <ThemeSelector />
    </section>
  );
}
