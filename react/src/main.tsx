import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'
import Recipes from '../src/components/Recipes.tsx';
import ErrorPage from '../src/error-page.tsx';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import FrontPage from './components/FrontPage.tsx';
import CreateRecipes from './components/CreateRecipes.tsx';
import LoginLogout from './components/LoginLogout.tsx';
import Profile from './components/Profile.tsx';

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
      },
      {
        path: "login/",
        element: <LoginLogout />,
      },
      {
        path: "logout/",
        element: <LoginLogout />,
      },
      {
        path: "profile/",
        element: <Profile />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
    authorizationParams={{
      redirectUri: window.location.origin,
  }}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Auth0Provider>,
)
