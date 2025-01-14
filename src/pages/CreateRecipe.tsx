import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RecipeForm from "../components/RecipeForm";

export default function CreateRecipe() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
}
