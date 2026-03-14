"use client";

import { useState, useTransition } from "react";
import {
  Coffee,
  Sun,
  Moon,
  X,
  CheckCircle2,
  HeartOff,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/ui/button";
import { toggleFavorite } from "@/app/(main)/meal/action";
import { useToast } from "@/context/toastContext";
import { MealType } from "@/types/recipe-types";

interface MealSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteId: number;
  isFavorite: boolean;
  mealName: string;
  mealId: number;
}

export default function MealSelectionModal({
  isOpen,
  onClose,
  favoriteId,
  isFavorite,
  mealName,
  mealId,
}: MealSelectionModalProps) {
  const [selected, setSelected] = useState<MealType>(null);
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleFavorite = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    startTransition(async () => {
      await toggleFavorite(mealId, isFavorite, favoriteId, selected).then(
        () => {
          const message = isFavorite
            ? `${mealName} removed from favorites`
            : `${mealName} added to favorites`;
          toast(message, "success");
          setSelected(null);
          onClose();
        },
      );
    });
  };

  if (!isOpen) return null;
  if (isFavorite) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-foreground/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />
        <div className="relative w-full max-w-md bg-white dark:bg-[#1c221a] rounded-[2.5rem] shadow-2xl border border-muted/10 p-8 text-center animate-in zoom-in-95 duration-300">
          <div className="size-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartOff size={40} />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">
            Remove Favorite?
          </h2>
          <p className="text-muted font-medium mb-8">
            Are you sure you want to remove{" "}
            <span className="text-foreground font-bold">{mealName}</span> from
            your saved recipes?
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => handleFavorite()}
              disabled={isPending}
              variant={"warning"}
              className="w-full text-white rounded-2xl py-4 font-bold"
            >
              {isPending ? "Removing..." : "Yes, Remove it"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full rounded-2xl py-4 border-muted/20 font-bold"
            >
              No, Keep it
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const options = [
    {
      id: "breakfast",
      label: "Breakfast",
      description: "Start your day with energy",
      icon: Coffee,
    },
    {
      id: "lunch",
      label: "Lunch",
      description: "Mid-day fuel for productivity",
      icon: Sun,
    },
    {
      id: "dinner",
      label: "Dinner",
      description: "Relax with a hearty evening meal",
      icon: Moon,
    },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1c221a] rounded-[2.5rem] shadow-2xl border border-muted/10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-foreground tracking-tight">
              Add to Planner
            </h2>
            <p className="text-muted text-sm font-medium">
              When are you having this meal?
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/10 rounded-full text-muted"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-3">
          {options.map((option) => {
            const isSelected = selected === option.id;
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id as MealType)}
                className={`w-full cursor-pointer flex items-center gap-4 p-4 rounded-3xl border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left ${isSelected ? "border-primary bg-primary/5" : "border-muted/5 bg-muted/5"}`}
              >
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center shadow-lg ${isSelected ? `bg-primary text-white` : `bg-white dark:bg-white/10 text-muted`}`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <span
                    className={`block font-bold ${isSelected ? "text-primary" : "text-foreground"}`}
                  >
                    {option.label}
                  </span>
                  <span className="text-xs text-muted font-medium">
                    {option.description}
                  </span>
                </div>
                {isSelected && (
                  <CheckCircle2
                    size={20}
                    className="text-primary animate-in zoom-in"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6 bg-muted/5 flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-2xl py-4"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleFavorite()}
              disabled={isPending}
              className="flex-1 rounded-2xl py-4"
            >
              {isPending ? "Saving..." : "Confirm"}
            </Button>
          </div>
          <button
            onClick={() => handleFavorite()}
            className="w-full py-2 text-xs font-black uppercase tracking-widest text-muted/60 hover:text-primary transition-colors text-center"
          >
            Skip for now, just add it
          </button>
        </div>
      </div>
    </div>
  );
}
