import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store';
import './index.css';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
// import Order from './pages/Order/Order';
import Vehicle from './pages/Vehicle/Vehicle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/consultar" element={<Vehicle />} />
        </Routes>
      </main>
    </BrowserRouter>
  </Provider>,
);
