import { LucideIcon } from "lucide-react";

export interface UrlInterface {
  id: string;
  label: string;
  href: string;
  requiresAuth?: boolean;
  guestOnly?: boolean;
}

export type sideNavbarInterface = {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
};
