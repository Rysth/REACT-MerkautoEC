import React from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Header from './components/Header/Header';
import Order from './pages/Order/Order';
import OrderList from './pages/Order/OrderList';
import Login from './pages/Login/Login';
import Vehicle from './pages/Vehicle/Vehicle';
import RysthImage from './assets/images/brand/logo_rysthcraft.png';
import CoficImage from './assets/images/brand/logo_cofic.png';

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
            path="/listado"
            element={
              <ProtectedRoute isAllowed={active} redirectTo="/">
                <OrderList />
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
      <footer className="mt-auto">
        <div className="flex justify-between max-w-screen-lg p-4 mx-auto border-t-0 border-b rounded-b-lg border-x">
          <div className="flex items-center w-2/4">
            <h3 className="text-xs font-semibold pointer-events-none">
              Powered by
            </h3>
            <a
              href="https://www.asvesot.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asvesot Website"
            >
              <img src={CoficImage} alt="Cofic logo" className="w-28" />
            </a>
          </div>
          <div className="flex items-center justify-end w-2/4 gap-2">
            <h3 className="text-xs font-semibold pointer-events-none">
              Created by
            </h3>
            <a
              href="https://react-rysthcraft.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ysthcraft Portfolio Website"
            >
              <img src={RysthImage} alt="Rysthcraft logo" className="w-20" />
            </a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
