"use client";
import { use, useMemo, useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { InputField } from "@/components/ui/input";
import { UpdateProfileSchema } from "@/schemas/profile";
import { ProfileEditForm } from "@/types/profile-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Cake, Camera, User, PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import SubmitAnimation from "@/components/shared/submitAnimation";
import { updateProfileActions, uploadProfilePictureAction } from "../action";
import { useToast } from "@/context/toastContext";
import Modal from "@/components/ui/modal";
import { UploadAvatarModal } from "./upload-avatar";
import { MAX_SIZE } from "@/libs/constants";

interface ProfileFormProps {
  fullName?: string;
  birthdate: string | null;
  bio: string | null;
  email: string | null;
  avatarUrl?: string | null;
}
export function ProfileForm({
  fullName,
  birthdate,
  bio,
  email,
  avatarUrl,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditForm>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      fullName: fullName || "",
      birthdate: birthdate || "",
      bio: bio || "",
    },
  });

  const onSubmit = async (data: ProfileEditForm) => {
    const result = await updateProfileActions(data);
    toast(result.message, result.status);
    if (result.status === "success") {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const birthdateInput = watch("birthdate");

  const calculatedAge = useMemo(() => {
    if (!birthdateInput) return null;

    const birthDateObj = new Date(birthdateInput);
    const today = new Date();

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }, [birthdateInput]);

  const handleProfileUpload = async (file: File) => {
    if (file.size > MAX_SIZE) {
      toast("File size must be less than 1MB", "error");
      return;
    }
    const result = await uploadProfilePictureAction(file);
    if (result.status === "success") {
      toast(result.message, result.status);
    } else {
      toast(result.message, result.status);
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Profile"
                className="w-24 h-24 rounded-2xl object-cover"
              />
            ) : (
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCenLArdCyyjE8adbWVx93RLRZPNw7uG4HbYOXZxGvro5Rc8y_wefDHOEQ9ZK4AIDL3urC5Y0ez0M-VB9Viota7Wthxq1_rZggI5Wues1UNuseJOoOuvLp-blmzyDEud45RwJiRxSSrVgVQVdIw8L0ppUQ_0Q4OcxaBFP5jxH-pd34CU51l5e3oPjjz2FO6nfNKFETr76H6FZp5K9UPf_W_NZO6dm2PJ7hYtDMr5-sc19mH0x6HqFP7S-vbyzPAmhVzMsbJXBua_6mo"
                alt="User Profile"
                className="w-24 h-24 rounded-2xl object-cover"
              />
            )}

            {isEditing && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-gray-900 transition-transform active:scale-90 animate-in zoom-in"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Personal Information</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-sm font-bold text-muted truncate">
                    {email}
                  </p>
                  <div className="flex items-center gap-1">
                    <BadgeCheck size={12} className="text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      Primary Identity
                    </span>
                  </div>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl border-muted/20 gap-2 h-9 px-4 text-xs font-bold"
                >
                  <PencilLine size={14} />
                  Edit Profile
                </Button>
              )}
            </div>

            <p className="text-xs text-muted mt-2">
              {isEditing
                ? "You are currently editing your details."
                : "Update your photo and personal details."}
            </p>
          </div>
        </div>

        <form
          className="grid md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label
              className="block text-sm font-bold text-foreground mb-2"
              htmlFor="fullname"
            >
              Fullname
            </label>
            <InputField
              id="fullname"
              type="text"
              placeholder="Chef Gusteau"
              icon={User}
              className="w-full"
              disabled={!isEditing}
              {...register("fullName")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground ml-1">
              Birth Information
            </label>
            <div className="flex gap-3">
              {/* Date Input */}
              <div className="flex-3">
                <InputField
                  type="date"
                  id="birthdate"
                  required
                  className="w-full"
                  icon={Cake}
                  disabled={!isEditing}
                  {...register("birthdate")}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Read-Only Age Display */}
              <div className="flex-1 min-w-20">
                <div
                  className="h-13 flex flex-col items-center justify-center rounded-2xl border border-muted/10 bg-muted/5 group transition-colors"
                  title="Age is calculated automatically"
                >
                  <span className="text-xs font-black uppercase tracking-tighter text-muted/50 leading-none mb-1">
                    Age
                  </span>
                  <span className="text-lg font-black text-foreground leading-none">
                    {/* Plug your calculation variable here */}
                    {calculatedAge || "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-sm font-bold text-foreground">Bio</label>
            </div>

            <textarea
              disabled={!isEditing}
              className="w-full px-5 py-4 rounded-2xl border border-muted/20 bg-background transition-all outline-none text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-muted/40 min-h-32 resize-none disabled:opacity-70"
              placeholder={`Tell us about your culinary interests... (Maximum ${120} characters)`}
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-red-500 text-xs  pl-2">{errors.bio.message}</p>
            )}
          </div>

          {/* Action Buttons - Only visible in Edit Mode */}
          {isEditing && (
            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-4 animate-in slide-in-from-top-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="rounded-xl px-6 font-bold text-muted hover:text-foreground transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl px-8 bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
              >
                {isSubmitting ? <SubmitAnimation /> : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </Card>
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <>
          <UploadAvatarModal
            onUpload={handleProfileUpload}
            onClose={() => setShowUploadModal(false)}
            isOpen={showUploadModal}
          />
        </>
      </Modal>
    </>
  );
}
