import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';

type Recipe = {
    id: number;
    name: string;
    is_public: boolean;
    created_at: string;
    description: string;
    steps: string;
    owner_id: number;
}

const Recipes: React.FC = () => {
    const [ recipes, setRecipes ] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/recipes')
        .then((response) => response.json())
        .then((data) => setRecipes(data));
    }, []);
    return (
        <Layout.Content style={{ padding: '0 48px' }}>
            <h1>Hello World!</h1>
            <h2>All Recipes</h2>
            <ul>
                {recipes.map((recipe: Recipe) => (
                    <li key={recipe.id}>
                        <p>{recipe.name}</p>
                        <p>{recipe.description}</p>
                        <p>{recipe.created_at}</p>
                        <p>{recipe.steps}</p>
                        <p>{recipe.owner_id}</p>
                    </li>
                ))}
            </ul>
        </Layout.Content>
    );
};

export default Recipes;
