import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './assets/auth/AuthContext.tsx'; // Import the AuthProvider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

console.log("API URL:", process.env.REACT_APP_API_URL);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
