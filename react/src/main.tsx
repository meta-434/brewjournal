import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Recipes from '../src/components/Recipes.tsx';
import ErrorPage from '../src/error-page.tsx';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import FrontPage from './components/FrontPage.tsx';
import CreateRecipes from './components/CreateRecipes.tsx';

// TODO: investigate restructuring of routes & Outputs for selective re-rendering
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <FrontPage />,
      },
      {
        path: "recipes/",
        element: <Recipes />,
      },
      {
        path: "create/",
        element: <CreateRecipes />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
