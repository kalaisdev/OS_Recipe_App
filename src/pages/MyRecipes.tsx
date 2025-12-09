import { Link } from 'react-router-dom';
import { ChefHat, Edit, Eye } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

export const MyRecipes = () => {
  const { recipes, loading } = useRecipes();

  const myRecipes = recipes.filter((recipe) => recipe.isOwner);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center">
            <ChefHat className="w-10 h-10 mr-3 text-emerald-600" />
            My Recipes
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and edit your personal recipe collection
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">Loading your recipes...</p>
          </div>
        ) : myRecipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 mb-4">
              <ChefHat className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
            <p className="text-gray-500 mb-6">Start creating your own delicious recipes</p>
            <Link
              to="/add"
              className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              Create Your First Recipe
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {myRecipes.length} {myRecipes.length === 1 ? 'recipe' : 'recipes'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {recipe.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {recipe.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                      <span>{recipe.cookTime} min</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        recipe.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Link>

                      <Link
                        to={`/edit/${recipe.id}`}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
