import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginLogout: React.FC = () => {
  const { logout, loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    );
  } else {
    return (
      <button onClick={() => loginWithRedirect()}>Log In</button>
    );
  }
};

export default LoginLogout;

