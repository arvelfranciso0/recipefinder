"use client";
import {
  Shield,
  Lock,
  PencilLine,
  X,
  EyeClosed,
  Eye,
  EyeIcon,
  EyeOff,
} from "lucide-react";
import { InputField } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useState } from "react";
import Card from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { UserUpdatePassordForm } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserPasswordSchema } from "@/schemas/user";
import { updatePasswordActions } from "./action";
import { useToast } from "@/context/toastContext";
import SubmitAnimation from "@/components/shared/submitAnimation";

export default function AccountSettings() {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, dirtyFields, isValid },
  } = useForm<UserUpdatePassordForm>({
    resolver: zodResolver(UpdateUserPasswordSchema),
  });

  const onSubmit = async (data: UserUpdatePassordForm) => {
    const result = await updatePasswordActions(data);
    toast(result.message, result.status);
  };

  return (
    <section className="flex-1 space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black text-foreground">
          Account Settings
        </h2>
        <p className="text-muted dark:text-muted/80 mt-1 font-medium">
          Manage your security settings and connected services.
        </p>
      </div>

      <Card>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Security</h3>
              <p className="text-sm text-muted font-medium">
                Update your password to keep your account safe.
              </p>
            </div>
          </div>

          {!isEditingPassword ? (
            <Button
              variant="outline"
              onClick={() => setIsEditingPassword(true)}
              className="rounded-xl border-muted/20 gap-2 h-9 px-4 text-xs font-bold"
            >
              <PencilLine size={14} />
              Edit Password
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                setIsEditingPassword(false);
                setShowPasswords(false);
              }}
              className="rounded-xl h-9 px-3 text-muted hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </Button>
          )}
        </div>

        {/* Password Fields - Conditional Rendering */}
        {isEditingPassword ? (
          <form
            className="grid gap-6 animate-in slide-in-from-top-4 duration-300"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="text-sm font-bold text-foreground ml-1"
                  htmlFor="current-password"
                >
                  Current Password
                </label>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="text-xs "
                >
                  {showPasswords ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              <InputField
                id="currentPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="••••••••"
                icon={Lock}
                className="w-full"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-3 pl-2">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-bold text-foreground ml-1"
                  htmlFor="new-password"
                >
                  New Password
                </label>
                <InputField
                  id="newPassword"
                  type={showPasswords ? "text" : "password"}
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-3 pl-2">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-bold text-foreground ml-1"
                  htmlFor="confirm-new-password"
                >
                  Confirm New Password
                </label>
                <InputField
                  id="confirmNewPassword"
                  type={showPasswords ? "text" : "password"}
                  placeholder="••••••••"
                  icon={Lock}
                  className="w-full"
                  {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-xs mt-3 pl-2">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
              >
                {isSubmitting ? <SubmitAnimation /> : "Update Password"}
              </Button>
            </div>
          </form>
        ) : (
          /* Placeholder / Collapsed State */
          <div
            className="py-6 border-2 border-dashed border-muted/10 rounded-4xl flex flex-center justify-center items-center group cursor-pointer hover:bg-muted/5 transition-colors"
            onClick={() => setIsEditingPassword(true)}
          >
            <p className="text-sm font-bold text-muted/40 group-hover:text-muted/60 transition-colors">
              Password fields are hidden for your security
            </p>
          </div>
        )}
      </Card>
    </section>
  );
}
