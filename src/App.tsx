import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import CreateRecipe from './pages/CreateRecipe';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<Recipe />} />
              <Route path="/create" element={<CreateRecipe />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;