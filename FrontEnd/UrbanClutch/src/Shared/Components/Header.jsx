import React from 'react';
import Navbar from './NavBar';

const Header = () => {
  return (
    <header className="header bg-black">
      <div className="container header-container">

        <img
          src="/Icons/Logo.png"
          alt="Logo"
          className="header-logo"
        />
        
        <Navbar />

      </div>
    </header>
  );
};

export default Header;