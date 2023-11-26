import React, { useEffect } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import Customer from './pages/Customer/Customer';
import { fetchCustomers } from './redux/slices/customerDataSlice';

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
    </BrowserRouter>
  );
}

export default App;
