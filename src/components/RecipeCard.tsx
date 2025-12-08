import { Link } from 'react-router-dom';
import { Clock, TrendingUp, User } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
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

  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime} min</span>
            </div>

            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-3 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 font-medium">{recipe.author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
