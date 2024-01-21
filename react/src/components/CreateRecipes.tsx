import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

type PlaceholderRecipe = {
    message: string;
};

const CreateRecipes: React.FC = () => {
    const [ newRecipe, setNewRecipe ] = useState<PlaceholderRecipe>({message: ''});
    useEffect(() => {
        setNewRecipe({message: 'new recipe'});
        console.log('TODO: set up form for creating a new recipe', newRecipe)
    }, []);
    return (
        <Layout.Content style={{ padding: '0 48px' }}>
            <h1>Create a New Recipe!</h1>
            <p>form goes here?</p>
        </Layout.Content>
    );
};

export default CreateRecipes;
