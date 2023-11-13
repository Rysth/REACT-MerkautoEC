import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import './index.css';
import Header from './components/Header/Header';
import Order from './pages/Order/Order';
import Login from './pages/Login/Login';
import Vehicle from './pages/Vehicle/Vehicle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <main>
        <NotificationContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/orden" element={<Order />} />
          <Route path="/consultar" element={<Vehicle />} />
        </Routes>
      </main>
    </BrowserRouter>
  </Provider>,
);
