import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { RecipeDetail } from './pages/RecipeDetail';
import { AddRecipe } from './pages/AddRecipe';
import { EditRecipe } from './pages/EditRecipe';
import { SavedRecipes } from './pages/SavedRecipes';
import { MyRecipes } from './pages/MyRecipes';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
      <Route path="/add" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
      <Route path="/saved" element={<ProtectedRoute><SavedRecipes /></ProtectedRoute>} />
      <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <AppRoutes />
          </div>
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
