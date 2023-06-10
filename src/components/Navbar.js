import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../navbar.css';
import cartItem from '../assets/grey-cart.png';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleMenu();
    }
  };

  useEffect(() => {
    // Close the menu when the location changes
    setMenuOpen(false);
  }, [location]);

  // Calculate the total quantity of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="cart-container">
        <Link to="/cart" className="cart-icon-link">
          <img src={cartItem} alt="Cart" className="cart-icon" />
          {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
        </Link>
      </div>

      <div className="links-container">
        <Link className="link-item" to="/">Home</Link>
        <Link className="link-item" to="/member">Member</Link>
        <Link className="link-item" to="/about">About</Link>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/member">Member</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div
        className="navbar-hamburger-menu"
        role="button"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        tabIndex="0">
        <span> </span>
        <span> </span>
        <span> </span>
      </div>
    </div>
  );
};

export default Navbar;

