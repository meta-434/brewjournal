import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Clock, Users, Star } from "../components/Icons";

interface Recipe {
  id: string;
  title: string;
  description: string;
  cooking_time: number;
  servings: number;
  image_url: string;
  profiles: {
    username: string;
  };
  average_rating: number;
  ratings: {
    rating: number;
  };
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase
        .from("recipes")
        .select(
          `
          *,
          profiles (username),
          ratings (rating)
        `,
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching recipes:", error);
        return;
      }

      const recipesWithRating = data.map((recipe) => ({
        ...recipe,
        average_rating: recipe.ratings.length
          ? recipe.ratings.reduce(
              (acc: number, curr: { rating: number }) => acc + curr.rating,
              0,
            ) / recipe.ratings.length
          : 0,
      }));

      setRecipes(recipesWithRating);
      setLoading(false);
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          to={`/recipe/${recipe.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={
              recipe.image_url ||
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3"
            }
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {recipe.description}
            </p>
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
            <div className="mt-2 text-sm text-gray-500">
              by {recipe.profiles.username}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
