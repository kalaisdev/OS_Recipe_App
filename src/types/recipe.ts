export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  author: string;
  createdAt: string;
  isOwner: boolean;
  isPublic: boolean;
}
