import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CardsPage } from './pages/CardsPage';
import { ProfilePage } from './pages/ProfilePage';
import { TheoryPage } from './pages/TheoryPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/cards"
        element={
          <ProtectedRoute>
            <CardsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/theory" element={<TheoryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
