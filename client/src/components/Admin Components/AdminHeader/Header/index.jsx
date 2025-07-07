import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faShoppingBasket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Navbar from './Navbar';
import Logout from '../../../Common Components/Logout';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);
  window.onscroll = () => {
    setActiveMenu(false);
  };
  const handleMenuButton = () => {
    setActiveMenu(!activeMenu);
  };
  const userName = localStorage.getItem('userName');
  return (
    <header className="header">
      <a href="/" className="logo">
        <i>
          <FontAwesomeIcon icon={faShoppingBasket} />
        </i>
        Grocery Leaf
      </a>
      <Navbar active={activeMenu} />
      <div className="icons">
        <button type="button" id="menu-btn" onClick={handleMenuButton}>
          <FontAwesomeIcon className="fa-icon" icon={faBars} />
        </button>
        {userName ? (
          <div
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              fontSize: '1.5rem',
              marginRight: '7px',
            }}
          >
            <FontAwesomeIcon className="fa-icon" icon={faUser} />
            <span>{userName}</span>
          </div>
        ) : (
          ''
        )}
        {userName ? (
          <Logout />
        ) : (
          <button
            className="login_btn"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
