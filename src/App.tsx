import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { RecipeDetail } from './pages/RecipeDetail';
import { AddRecipe } from './pages/AddRecipe';
import { EditRecipe } from './pages/EditRecipe';
import { SavedRecipes } from './pages/SavedRecipes';
import { MyRecipes } from './pages/MyRecipes';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/edit/:id" element={<EditRecipe />} />
            <Route path="/saved" element={<SavedRecipes />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
          </Routes>
        </div>
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
