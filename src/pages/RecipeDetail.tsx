import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, User, Calendar, Bookmark } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

export const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, isSaved, toggleSaved } = useRecipes();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Hard':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const saved = isSaved(recipe.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to feed</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="relative h-80 sm:h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div className="flex-1 mb-4 sm:mb-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {recipe.description}
                </p>
              </div>

              <button
                onClick={() => toggleSaved(recipe.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  saved
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">{recipe.cookTime} minutes</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">{recipe.difficulty}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">{recipe.author}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">{new Date(recipe.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-8 bg-emerald-600 mr-3 rounded"></span>
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-8 bg-emerald-600 mr-3 rounded"></span>
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
