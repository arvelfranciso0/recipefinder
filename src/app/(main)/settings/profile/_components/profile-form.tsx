"use client";
import Card from "@/components/ui/card";
import { InputField } from "@/components/ui/input";
import { Camera, Mail, User } from "lucide-react";

export function ProfileForm() {
  return (
    <Card>
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCenLArdCyyjE8adbWVx93RLRZPNw7uG4HbYOXZxGvro5Rc8y_wefDHOEQ9ZK4AIDL3urC5Y0ez0M-VB9Viota7Wthxq1_rZggI5Wues1UNuseJOoOuvLp-blmzyDEud45RwJiRxSSrVgVQVdIw8L0ppUQ_0Q4OcxaBFP5jxH-pd34CU51l5e3oPjjz2FO6nfNKFETr76H6FZp5K9UPf_W_NZO6dm2PJ7hYtDMr5-sc19mH0x6HqFP7S-vbyzPAmhVzMsbJXBua_6mo"
            alt="User Profile"
            className="w-24 h-24 rounded-2xl object-cover"
          />
          <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg border-2 border-white dark:border-gray-900 transition-transform active:scale-90">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold">Personal Information</h3>
          <p className="text-sm text-muted">
            Update your photo and personal details.
          </p>
        </div>
      </div>

      <form
        className="grid md:grid-cols-2 gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label
            className="block text-sm font-bold text-foreground mb-2"
            htmlFor="fullname"
          >
            Full Name
          </label>
          <InputField
            id="fullname"
            type="text"
            placeholder="Chef Gusteau"
            icon={User}
            className="w-full"
          />
        </div>
        <div>
          <label
            className="block text-sm font-bold text-foreground mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <InputField
            type="email"
            id="email"
            placeholder="name@example.com"
            required
            className="w-full"
            icon={Mail}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-foreground">Bio</label>
          <textarea
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-background transition-all outline-none text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-muted/40 min-h-25"
            placeholder="Tell us about your culinary interests..."
          />
        </div>
      </form>
    </Card>
  );
}
