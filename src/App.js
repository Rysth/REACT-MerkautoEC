import React from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Login from './pages/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
/* import RysthImage from './assets/images/brand/logo_rysthcraft.png';
import CoficImage from './assets/images/brand/logo_cofic.png'; */

/* eslint-disable */
function App() {
  const active = useSelector(
    (state) => state.credentials.userCredentials.active,
  );

  return (
    <BrowserRouter>
      <main className="bg-[var(--CL-primary-blue)] flex">
        <Sidebar />
        <NotificationContainer />
        <section className="flex-1 p-6 py-4">
          <div className="h-full p-4 bg-white rounded-2xl">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute isAllowed={!active} redirectTo="/">
                    <Login />
                  </ProtectedRoute>
                }
              />
              {/* <Route
            path="/orden"
            element={
              <ProtectedRoute isAllowed={active} redirectTo="/">
                <Order />
              </ProtectedRoute>
            }
          /> */}
            </Routes>
          </div>
        </section>
      </main>
      {/* <footer className="mt-auto">
        <div className="flex justify-between max-w-screen-lg p-4 mx-auto border-t-0 border-b rounded-b-lg border-x">
          <div className="">
            <a
              href="https://www.asvesot.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Asvesot Website"
            >
              <img src={CoficImage} alt="Cofic logo" className="w-28" />
            </a>
          </div>
          <div className="">
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
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
