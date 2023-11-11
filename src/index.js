import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header/Header';
import Order from './pages/Order/Order';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Order />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
);
