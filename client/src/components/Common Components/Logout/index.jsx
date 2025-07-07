import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Logout.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon fa-icon" style={{ fontSize: "20px" }} />
    </button>
  );
};

export default LogoutButton;
