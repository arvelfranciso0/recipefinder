"use client";
import { Shield, Link as LinkIcon, Lock, Eye } from "lucide-react";
import { InputField } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { SocialToggle } from "./_components/social-toggle";
import { Google } from "@/components/icons/google";
import { Fb } from "@/components/icons/fb";
import { useState } from "react";
import { VerificationModal } from "./_components/verification";

export default function AccountSettings() {
  const [showVerification, setShowVerifcation] = useState(false);
  return (
    <section className="flex-1 space-y-8">
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerifcation(false)}
      />
      <div>
        <h2 className="text-3xl font-black text-foreground">
          Account Settings
        </h2>
        <p className="text-muted dark:text-muted/80 mt-1">
          Manage your security settings and connected services.
        </p>
      </div>

      <div className="bg-white dark:bg-white/5 rounded-3xl p-6 md:p-8 soft-shadow border border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <div className=" dark:bg-white/10 p-3 rounded-2xl text-foreground">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Security</h3>
            <p className="text-sm text-muted">
              Update your password to keep your account safe.
            </p>
          </div>
        </div>

        <div className="grid gap-6 max-w-2xl">
          <div>
            <label
              className="block text-sm font-bold text-foreground mb-2"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
                <Lock />
              </span>
              <InputField
                id="current-password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                className="w-full"
              />

              <button
                type="button"
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              >
                <Eye />
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="new-password"
              >
                New Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
                  <Lock />
                </span>
                <InputField
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
                />

                <button
                  type="button"
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <Eye />
                </button>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-bold text-foreground mb-2"
                htmlFor="confirm-new-password"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted/50">
                  <Lock />
                </span>
                <InputField
                  id="confirm-new-password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
                />

                <button
                  type="button"
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <Eye />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Button variant="primary" onClick={() => setShowVerifcation(true)}>
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {/* Connected Accounts Card */}
      <div className="bg-white dark:bg-white/5 rounded-3xl p-6 md:p-8 soft-shadow border border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-slate-100 dark:bg-white/10 p-3 rounded-2xl text-foreground">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Connected Accounts</h3>
            <p className="text-sm text-muted">
              Manage your social logins and third-party integrations.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <SocialToggle
            name="Google"
            connected={true}
            description="Currently connected"
            icon={<Google />}
          />
          <SocialToggle
            name="Facebook"
            connected={false}
            description="Not connected"
            icon={<Fb />}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </section>
  );
}
