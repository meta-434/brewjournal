import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Clock, Users, Star } from "../components/Icons";
import RatingForm from "../components/RatingForm";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";

interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string;
  cooking_time: number;
  servings: number;
  image_url: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface Rating {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

export default function Recipe() {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipeData = useCallback(async () => {
    try {
      const [recipeData, ingredientsData, ratingsData] = await Promise.all([
        supabase
          .from("recipes")
          .select("*, profiles(username)")
          .eq("id", id)
          .single(),
        supabase.from("ingredients").select("*").eq("recipe_id", id),
        supabase
          .from("ratings")
          .select("*, profiles(username)")
          .eq("recipe_id", id)
          .order("created_at", { ascending: false }),
      ]);

      if (recipeData.error) throw recipeData.error;
      if (ingredientsData.error) throw ingredientsData.error;
      if (ratingsData.error) throw ratingsData.error;

      setRecipe(recipeData.data);
      setIngredients(ingredientsData.data);
      setRatings(ratingsData.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  }, [id]); // Add id as a dependency

  useEffect(() => {
    fetchRecipeData();
  }, [fetchRecipeData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Recipe not found</h2>
      </div>
    );
  }

  const averageRating = ratings.length
    ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={
            recipe.image_url ||
            "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3"
          }
          alt={recipe.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{recipe.cooking_time} mins</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-5 w-5" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5" />
                <span>
                  {averageRating.toFixed(1)} ({ratings.length} reviews)
                </span>
              </div>
            </div>
            <div className="text-gray-600">by {recipe.profiles.username}</div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 mb-4">{recipe.description}</p>

            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-5 mb-6">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className="text-gray-600">
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <div className="text-gray-600 whitespace-pre-wrap">
              {recipe.instructions}
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

            {user && (
              <div className="mb-8">
                <RatingForm
                  recipeId={recipe.id}
                  onRatingSubmit={fetchRecipeData}
                />
              </div>
            )}

            <div className="space-y-6">
              {ratings.map((rating) => (
                <div key={rating.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < rating.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">
                        {rating.profiles.username}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(rating.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                  {rating.comment && (
                    <p className="text-gray-600">{rating.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
