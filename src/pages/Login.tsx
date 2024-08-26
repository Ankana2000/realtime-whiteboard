import React from 'react';
import Keycloak from 'keycloak-js';
import keycloak from '../config/keycloak';

const Login: React.FC = () => {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div className="login-page">
      <button onClick={handleLogin}>Login with Keycloak</button>
    </div>
  );
};

export default Login;
