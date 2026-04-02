import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';
import App from './App.tsx';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*
            /reset-password — handles the second half of the PocketBase password
            reset flow.  PocketBase sends an email with a link to this route
            containing a `token` query parameter.  The component calls
            pb.collection('users').confirmPasswordReset(token, pw, pw).

            IMPORTANT: In PocketBase Admin → users collection → Options →
            "Password reset URL", set the value to:
              https://yourapp.com/reset-password?token={TOKEN}
          */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/*"
            element={
              <AuthGuard>
                <App />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
