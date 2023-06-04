import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { cart } from 'reducers/cart';
import { products } from 'reducers/products';
import MemberPage from 'pages/MemberPage'
import NotFound from 'pages/NotFound';
import CardsList from './components/CardsList';
// import Hero from './components/Hero'
import Cart from './components/Cart';
import FlowerCarousel from './components/FlowerCarousel';

const reducer = combineReducers({
  cart: cart.reducer,
  products: products.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/member">Member Page</Link>
        </nav>
        <div className="outer-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/member" element={<MemberPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

const HomePage = () => {
  return (
    <div>
      <Cart />
      <FlowerCarousel />
      <CardsList />
    </div>
  );
};

/*
      // <Cart />
      // <CartProducts />
          <Provider store={store}>
      <Router>
        <Hero />
        <Routes>
          <Route path="/" element={<div><Hero /><CardsList /></div>} />
          <nav>
            <Link to="/member">Member Page</Link>
          </nav>
          <Route path="/member" element={<MemberPage />} />
        </Routes>
      </Router>
    </Provider>
          <FlowerCarousel />
*/