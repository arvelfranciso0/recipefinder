import { toggleFavorite } from "@/app/(main)/meal/action";
import { useToast } from "@/context/toastContext";
import { Heart } from "lucide-react";
import { useTransition } from "react";

interface FavoriteButtonProps {
  id: number;
  meal: string;
  isFavorite: boolean;
  favoriteId: number | null;
}

export default function FavoriteButton({
  id,
  meal,
  isFavorite,
  favoriteId,
}: FavoriteButtonProps) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFavorite = (
    mealId: number,
    e: React.MouseEvent,
    isFavorite: boolean,
    mealName: string,
    id: number | null,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      toggleFavorite(mealId, isFavorite, id as number).then((value: void) => {
        const message = isFavorite
          ? `${mealName} removed from favorites`
          : `${mealName} added to favorites`;
        toast(message, "success");
      });
    });
  };

  return (
    <button
      onClick={(e: React.MouseEvent) =>
        !isPending && handleFavorite(id, e, isFavorite, meal, favoriteId)
      }
      disabled={isPending}
      className={`absolute ${isPending ? "cursor-not-allowed" : "cursor-pointer"} top-3 right-3 bg-white/90 dark:bg-background/90 backdrop-blur-md p-2 rounded-full hover:scale-110 active:scale-90 transition-all shadow-sm z-20`}
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-300 ${
          isFavorite
            ? "text-primary fill-primary hover:fill-transparent"
            : "text-muted fill-transparent hover:fill-primary hover:text-primary"
        }`}
      />
    </button>
  );
}
