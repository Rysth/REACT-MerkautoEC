import React from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Header from './components/Header/Header';
import Order from './pages/Order/Order';
import Login from './pages/Login/Login';
import Vehicle from './pages/Vehicle/Vehicle';

/* eslint-disable */
function App() {
  const active = useSelector(
    (state) => state.credentials.userCredentials.active,
  );

  return (
    <BrowserRouter>
      <Header />
      <main>
        <NotificationContainer />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!active} redirectTo="/orden">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orden"
            element={
              <ProtectedRoute isAllowed={active} redirectTo="/">
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultar"
            element={
              <ProtectedRoute isAllowed={active} redirectTo="/">
                <Vehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute isAllowed={active} redirectTo="/">
                <Order />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
