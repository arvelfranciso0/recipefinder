import { AlertVariant } from "@/types/alert-type";

export interface AlertProps {
  title?: string;
  description: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}
