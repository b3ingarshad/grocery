// Navbar
import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

export default function Navbar(props) {
  const { active } = props;
  return (
    <nav className={`navbar Rs{active ? 'active' : ''}`}>
      <a href="/vendor-home">Home</a>
      <a href="/vendor-home/add-product">AddProduct</a>
      <a href="/vendor-home/manage-order-status">Manage Order Status</a>
      <a href="/vendor-home/vendor-profile">Profile</a>
    </nav>
  );
}
Navbar.propTypes = {
  active: PropTypes.bool,
}.isRequired;
