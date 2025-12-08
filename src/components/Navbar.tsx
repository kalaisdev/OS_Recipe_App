import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Home, PlusCircle, Bookmark, User } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors">
            <ChefHat className="w-8 h-8" />
            <span className="text-xl font-bold hidden sm:block">Simple Recipes</span>
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Home</span>
            </Link>

            <Link
              to="/my-recipes"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/my-recipes')
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">My Recipes</span>
            </Link>

            <Link
              to="/saved"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/saved')
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Saved</span>
            </Link>

            <Link
              to="/add"
              className="flex items-center space-x-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Add Recipe</span>
            </Link>

            <div className="ml-2 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
              JS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
