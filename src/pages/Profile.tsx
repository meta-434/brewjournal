import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Clock, Users, Star } from '../components/Icons';

interface Profile {
  username: string;
  avatar_url: string | null;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  cooking_time: number;
  servings: number;
  image_url: string;
  average_rating: number;
}

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const [profileData, recipesData] = await Promise.all([
          supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single(),
          supabase
            .from('recipes')
            .select(`
              *,
              ratings (rating)
            `)
            .eq('user_id', id)
            .order('created_at', { ascending: false })
        ]);

        if (profileData.error) throw profileData.error;
        if (recipesData.error) throw recipesData.error;

        setProfile(profileData.data);
        
        const recipesWithRating = recipesData.data.map(recipe => ({
          ...recipe,
          average_rating: recipe.ratings.length
            ? recipe.ratings.reduce((acc: number, curr: any) => acc + curr.rating, 0) / recipe.ratings.length
            : 0
        }));

        setRecipes(recipesWithRating);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{profile.username}'s Profile</h1>
        <p className="text-gray-600">
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} shared
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={recipe.image_url || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3'}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.cooking_time} mins</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{recipe.average_rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}