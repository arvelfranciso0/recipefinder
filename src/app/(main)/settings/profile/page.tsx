"use client";

import Button from "@/components/ui/button";
import { ProfileForm } from "./_components/profile-form";
import { ThemeSelector } from "@/components/shared/themeSelector";

export default function ProfilePage() {
  return (
    <section className="flex-1 space-y-8">
      <div>
        <h2 className="text-3xl font-black text-foreground">User Settings</h2>
        <p className="text-muted mt-1">
          Manage your account information and preferences.
        </p>
      </div>

      <ProfileForm />
      <ThemeSelector />

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </section>
  );
}
