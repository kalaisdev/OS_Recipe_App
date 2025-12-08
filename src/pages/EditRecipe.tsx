import { useParams, useNavigate } from 'react-router-dom';
import { RecipeForm } from '../components/RecipeForm';
import { useRecipes } from '../context/RecipeContext';

export const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes } = useRecipes();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <button
            onClick={() => navigate('/my-recipes')}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Return to my recipes
          </button>
        </div>
      </div>
    );
  }

  if (!recipe.isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access denied</h2>
          <p className="text-gray-600 mb-4">You can only edit your own recipes</p>
          <button
            onClick={() => navigate('/my-recipes')}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Return to my recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Edit Recipe
          </h1>
          <p className="text-gray-600 text-lg">
            Update your recipe details
          </p>
        </div>

        <RecipeForm editRecipe={recipe} />
      </div>
    </div>
  );
};
