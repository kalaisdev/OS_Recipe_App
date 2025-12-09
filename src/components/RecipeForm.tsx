import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types/recipe';

interface RecipeFormProps {
  editRecipe?: Recipe;
}

export const RecipeForm = ({ editRecipe }: RecipeFormProps) => {
  const navigate = useNavigate();
  const { addRecipe, updateRecipe } = useRecipes();

  const [formData, setFormData] = useState({
    title: editRecipe?.title || '',
    description: editRecipe?.description || '',
    image: editRecipe?.image || '',
    ingredients: editRecipe?.ingredients.join('\n') || '',
    steps: editRecipe?.steps.join('\n') || '',
    cookTime: editRecipe?.cookTime.toString() || '',
    difficulty: editRecipe?.difficulty || 'Easy',
    author: editRecipe?.author || 'John Smith',
    isPublic: editRecipe?.isPublic ?? true,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const recipeData = {
      title: formData.title,
      description: formData.description,
      image: formData.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
      steps: formData.steps.split('\n').filter(s => s.trim()),
      cookTime: parseInt(formData.cookTime) || 30,
      difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard',
      author: formData.author,
      isPublic: formData.isPublic,
    };

    if (editRecipe) {
      await updateRecipe(editRecipe.id, recipeData);
    } else {
      await addRecipe(recipeData);
    }

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/my-recipes');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Save className="w-4 h-4 text-white" />
          </div>
          <span className="text-green-800 font-medium">
            Recipe {editRecipe ? 'updated' : 'created'} successfully!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="e.g., Classic Chocolate Chip Cookies"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="A brief description of your recipe..."
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2">
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-sm"
              placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
            />
          </div>

          <div>
            <label htmlFor="steps" className="block text-sm font-semibold text-gray-700 mb-2">
              Cooking Steps (one per line)
            </label>
            <textarea
              id="steps"
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-sm"
              placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cookTime" className="block text-sm font-semibold text-gray-700 mb-2">
                Cook Time (minutes)
              </label>
              <input
                type="number"
                id="cookTime"
                value={formData.cookTime}
                onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="30"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
              Make this recipe public
            </label>
          </div>
        </div>

        <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{editRecipe ? 'Update Recipe' : 'Create Recipe'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700 flex items-center justify-center space-x-2"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};
