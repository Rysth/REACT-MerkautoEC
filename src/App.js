import React, { useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Customer from './pages/Customer/Customer';
import Vehicle from './pages/Vehicle/Vehicle';
import Order from './pages/Order/Order';
import { fetchCustomers } from './redux/slices/customerDataSlice';
import { fetchVehicles } from './redux/slices/vehicleDataSlice';
import { fetchOrders } from './redux/slices/orderDataSlice';

/* eslint-disable */
function App() {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.credentials.active);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchVehicles());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <main className="bg-[var(--CL-primary-blue)] flex flex-col sm:flex-row h-screen">
        {active && <Sidebar />}
        <NotificationContainer />
        <section className="flex-1 overflow-hidden">
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute isAllowed={!active} redirectTo="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={active} redirectTo="/login">
                  <Customer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehiculos"
              element={
                <ProtectedRoute isAllowed={active} redirectTo="/login">
                  <Vehicle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ordenes"
              element={
                <ProtectedRoute isAllowed={active} redirectTo="/login">
                  <Order />
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
