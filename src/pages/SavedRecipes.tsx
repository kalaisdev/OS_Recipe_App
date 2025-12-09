import { Bookmark } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

export const SavedRecipes = () => {
  const { recipes, savedRecipeIds, loading } = useRecipes();

  const savedRecipes = recipes.filter((recipe) =>
    savedRecipeIds.includes(recipe.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center">
            <Bookmark className="w-10 h-10 mr-3 text-emerald-600" />
            Saved Recipes
          </h1>
          <p className="text-gray-600 text-lg">
            Your collection of favorite recipes
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">Loading saved recipes...</p>
          </div>
        ) : savedRecipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 mb-4">
              <Bookmark className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No saved recipes yet</h3>
            <p className="text-gray-500 mb-6">Start saving recipes you love to find them here later</p>
            <a
              href="/"
              className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Browse Recipes
            </a>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {savedRecipes.length} saved {savedRecipes.length === 1 ? 'recipe' : 'recipes'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
