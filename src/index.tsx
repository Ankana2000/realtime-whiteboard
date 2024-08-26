import React from 'react';
import ReactDOM from 'react-dom';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import App from './App';

// Create Keycloak instance
const keycloakInstance = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'myrealm',
  clientId: 'myclient',
});

const keycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
};

ReactDOM.render(
  <ReactKeycloakProvider
    keycloak={keycloakInstance}
    initOptions={keycloakInitOptions}
  >
    <App />
  </ReactKeycloakProvider>,
  document.getElementById('root')
);