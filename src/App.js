import React, { useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import Customer from './pages/Customer/Customer';
import Vehicle from './pages/Vehicle/Vehicle';
import Login from './pages/Login/Login';
import { fetchCustomers } from './redux/slices/customerDataSlice';
import { fetchVehicles } from './redux/slices/vehicleDataSlice';

/* eslint-disable */
function App() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.credentials.active);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <main className="bg-[var(--CL-primary-blue)] flex flex-col sm:flex-row h-screen">
        {active && <Sidebar />}
        <NotificationContainer />
        <section className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={!active} redirectTo="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute isAllowed={active} redirectTo="/">
                  <Customer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehiculos"
              element={
                <ProtectedRoute isAllowed={active} redirectTo="/">
                  <Vehicle />
                </ProtectedRoute>
              }
            />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
