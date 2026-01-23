export interface Recipe {
  id: number;
  title: string;
  tag: string;
  time: string;
  rating: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  difficulty: string;
  tagColor: string;
  isFavorite?: boolean;
}
