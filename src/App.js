import React, { useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Order from './pages/Order/Order';
import Customer from './pages/Customer/Customer';
import Sidebar from './components/Sidebar/Sidebar';
import { fetchCustomers } from './redux/slices/customerDataSlice';
/* import RysthImage from './assets/images/brand/logo_rysthcraft.png';
import CoficImage from './assets/images/brand/logo_cofic.png'; */

/* eslint-disable */
function App() {
  const dispatch = useDispatch();
  const active = useSelector(
    (state) => state.credentials.userCredentials.active,
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <main className="bg-[var(--CL-primary-blue)] flex flex-col sm:flex-row h-screen">
        <Sidebar />
        <NotificationContainer />
        <section className="flex-1 p-4 overflow-hidden">
          <div className="h-full p-6 bg-white sm:p-10 rounded-2xl">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute isAllowed={!active} redirectTo="/">
                    <Customer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ordenes"
                element={
                  <ProtectedRoute isAllowed={!active} redirectTo="/clientes">
                    <Order />
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
