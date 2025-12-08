import { RecipeForm } from '../components/RecipeForm';

export const AddRecipe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Create New Recipe
          </h1>
          <p className="text-gray-600 text-lg">
            Share your culinary creation with the community
          </p>
        </div>

        <RecipeForm />
      </div>
    </div>
  );
};
