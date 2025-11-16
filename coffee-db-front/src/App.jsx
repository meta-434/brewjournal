import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function RecipeFull() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFullRecipe() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("recipes")
        .select(
          `
          *,
          user:users(*),
          brewer:brewers(
            *,
            manufacturer:brewer_manufacturers(*)
          ),
          grinder:grinders(
            *,
            manufacturer:grinder_manufacturers(*)
          ),
          bean:beans(*),
          roast:roasts(
            *,
            roaster:roasters(*)
          ),
          steps:recipe_steps(*)
        `,
        )
        .eq("id", "1359e8d1-13f3-4974-aee1-aba934db9ffa")
        .single();

      if (error) {
        console.error(error);
        setError(error);
      } else {
        // Sort steps by step_number to ensure correct sequence
        if (data?.steps) {
          data.steps.sort((a, b) => a.step_number - b.step_number);
        }
        setRecipe(data);
      }
      setLoading(false);
    }

    fetchFullRecipe();
  }, []);

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>Error loading recipe: {error.message}</p>;
  if (!recipe) return <p>No recipe found</p>;

  const roasterName = recipe.roast?.roaster?.name ?? "Unknown roaster";

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Roaster: {roasterName}</p>
      <p>User: {recipe.user?.display_name ?? "Unknown user"}</p>
      <p>Brewer: {recipe.brewer?.model_name ?? "N/A"}</p>
      <p>Grinder: {recipe.grinder?.model_name ?? "N/A"}</p>

      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step) => (
          <li key={step.id}>
            {step.instruction} (Start: {step.t_start_seconds}s, Duration:{" "}
            {step.t_delta_seconds}s, Volume +{step.v_delta_ml} mL)
          </li>
        ))}
      </ol>
    </div>
  );
}
