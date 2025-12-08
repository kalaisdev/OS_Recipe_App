import { createContext, useContext, useState, ReactNode } from 'react';
import { Recipe } from '../types/recipe';
import { mockRecipes } from '../data/mockRecipes';

interface RecipeContextType {
  recipes: Recipe[];
  savedRecipeIds: string[];
  toggleSaved: (recipeId: string) => void;
  isSaved: (recipeId: string) => boolean;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => void;
  updateRecipe: (id: string, recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);

  const toggleSaved = (recipeId: string) => {
    setSavedRecipeIds((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const isSaved = (recipeId: string) => savedRecipeIds.includes(recipeId);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      isOwner: true,
    };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const updateRecipe = (id: string, recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...recipe }
          : r
      )
    );
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, savedRecipeIds, toggleSaved, isSaved, addRecipe, updateRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipeProvider');
  }
  return context;
};
