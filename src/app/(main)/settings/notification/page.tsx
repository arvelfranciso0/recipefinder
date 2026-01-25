import { Utensils, CalendarDays, ShieldCheck, Info } from "lucide-react";
import Button from "@/components/ui/button";
import { NotificationToggle } from "./_components/notification-toggle";
import Card from "@/components/ui/card";

export default function NotificationSettings() {
  return (
    <section className="flex-1 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-foreground">
          Notification Settings
        </h2>
        <p className="text-muted dark:text-muted/80 mt-1">
          Control how and when you want to be notified about your favorite
          recipes.
        </p>
      </div>

      {/* Toggles Container */}
      <Card>
        <div className="space-y-8">
          <NotificationToggle
            title="New Recipe Alerts"
            description="Get notified as soon as new recipes matching your dietary preferences are published."
            icon={<Utensils className="w-5 h-5" />}
            defaultChecked={true}
          />

          <div className="border-t border-gray-50 dark:border-white/5" />

          <NotificationToggle
            title="Weekly Meal Plans"
            description="Receive a curated collection of recipes and shopping lists every Sunday morning."
            icon={<CalendarDays className="w-5 h-5" />}
            defaultChecked={true}
          />

          <div className="border-t border-gray-50 dark:border-white/5" />

          {/* <NotificationToggle
            title="Account Updates"
            description="Important notifications regarding your account security and new feature announcements."
            icon={<ShieldCheck className="w-5 h-5" />}
            defaultChecked={false}
          /> */}
        </div>
      </Card>

      {/* Info Box */}
      <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-6 flex items-start gap-4">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-muted dark:text-muted/80 leading-relaxed">
          By default, notifications are sent to your registered email address{" "}
          <strong className="text-foreground">john.doe@example.com</strong>. You
          can change your email in the Profile settings.
        </p>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button variant="ghost">Discard Changes</Button>
        <Button>Save Changes</Button>
      </div>
    </section>
  );
}
