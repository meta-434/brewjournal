import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export default function RecipeForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState(30);
  const [servings, setServings] = useState(4);
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', amount: 1, unit: 'cup' }
  ]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 1, unit: 'cup' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { data: recipe, error: recipeError } = await supabase
        .from('recipes')
        .insert([{
          title,
          description,
          instructions,
          cooking_time: cookingTime,
          servings,
          image_url: imageUrl,
          user_id: user.id
        }])
        .select()
        .single();

      if (recipeError) throw recipeError;

      const { error: ingredientsError } = await supabase
        .from('ingredients')
        .insert(
          ingredients.map(ing => ({
            recipe_id: recipe.id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit
          }))
        );

      if (ingredientsError) throw ingredientsError;

      toast.success('Recipe created successfully!');
      navigate(`/recipe/${recipe.id}`);
    } catch (error) {
      toast.error('Failed to create recipe');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea
          required
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            required
            min="1"
            value={cookingTime}
            onChange={(e) => setCookingTime(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Servings</label>
          <input
            type="number"
            required
            min="1"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <button
            type="button"
            onClick={handleAddIngredient}
            className="flex items-center text-sm text-orange-600 hover:text-orange-700"
          >
            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Add Ingredient
          </button>
        </div>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', parseFloat(e.target.value))}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="cup">cup</option>
                <option value="tbsp">tbsp</option>
                <option value="tsp">tsp</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
              </select>
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Create Recipe
      </button>
    </form>
  );
}