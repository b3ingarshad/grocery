// Navbar
import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  const { active } = props;
  return (
    <nav className={`navbar ${active ? 'active' : ''}`}>
      <Link to="/user-home">home</Link>
      {/* <Link to="/user-home/features">features</Link> */}
      <Link to="/user-home/product">products</Link>
      <Link to="/user-home/categories">categories</Link>
      <Link to="/user-home/review">review</Link>
      <Link to="/user-home/blogs">blogs</Link>
      <Link to="/user-home/order">Order Status</Link>
      <Link to="/user-home/Profile">Profile</Link>
    </nav>
  );
}
Navbar.propTypes = {
  active: PropTypes.bool,
}.isRequired;
