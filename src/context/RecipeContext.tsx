import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe } from '../types/recipe';
import { supabase } from '../lib/supabase';

interface RecipeContextType {
  recipes: Recipe[];
  savedRecipeIds: string[];
  toggleSaved: (recipeId: string) => Promise<void>;
  isSaved: (recipeId: string) => boolean;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => Promise<void>;
  updateRecipe: (id: string, recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => Promise<void>;
  loading: boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const getUserId = () => {
  let userId = localStorage.getItem('temp_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('temp_user_id', userId);
  }
  return userId;
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const userId = getUserId();
      const formattedRecipes: Recipe[] = (data || []).map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
        ingredients: recipe.ingredients as string[],
        steps: recipe.steps as string[],
        cookTime: recipe.cook_time,
        difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
        author: recipe.author,
        createdAt: recipe.created_at.split('T')[0],
        isOwner: recipe.user_id === userId,
        isPublic: recipe.is_public,
      }));

      setRecipes(formattedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('saved_recipes')
        .select('recipe_id')
        .eq('user_id', userId);

      if (error) throw error;

      setSavedRecipeIds((data || []).map((item) => item.recipe_id));
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  const toggleSaved = async (recipeId: string) => {
    const userId = getUserId();
    const isCurrentlySaved = savedRecipeIds.includes(recipeId);

    try {
      if (isCurrentlySaved) {
        const { error } = await supabase
          .from('saved_recipes')
          .delete()
          .eq('recipe_id', recipeId)
          .eq('user_id', userId);

        if (error) throw error;
        setSavedRecipeIds((prev) => prev.filter((id) => id !== recipeId));
      } else {
        const { error } = await supabase
          .from('saved_recipes')
          .insert({ recipe_id: recipeId, user_id: userId });

        if (error) throw error;
        setSavedRecipeIds((prev) => [...prev, recipeId]);
      }
    } catch (error) {
      console.error('Error toggling saved recipe:', error);
    }
  };

  const isSaved = (recipeId: string) => savedRecipeIds.includes(recipeId);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => {
    try {
      const userId = getUserId();
      const { data, error } = await supabase
        .from('recipes')
        .insert({
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cook_time: recipe.cookTime,
          difficulty: recipe.difficulty,
          author: recipe.author,
          is_public: recipe.isPublic,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;

      const newRecipe: Recipe = {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        ingredients: data.ingredients as string[],
        steps: data.steps as string[],
        cookTime: data.cook_time,
        difficulty: data.difficulty as 'Easy' | 'Medium' | 'Hard',
        author: data.author,
        createdAt: data.created_at.split('T')[0],
        isOwner: true,
        isPublic: data.is_public,
      };

      setRecipes((prev) => [newRecipe, ...prev]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const updateRecipe = async (id: string, recipe: Omit<Recipe, 'id' | 'createdAt' | 'isOwner'>) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .update({
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cook_time: recipe.cookTime,
          difficulty: recipe.difficulty,
          author: recipe.author,
          is_public: recipe.isPublic,
        })
        .eq('id', id);

      if (error) throw error;

      setRecipes((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, ...recipe }
            : r
        )
      );
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, savedRecipeIds, toggleSaved, isSaved, addRecipe, updateRecipe, loading }}
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
