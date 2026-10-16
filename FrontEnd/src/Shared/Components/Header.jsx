import React from 'react';
import Navbar from './NavBar';
import { DropdownToggle } from 'react-bootstrap';
import NavToggle from './NavToggle';

const Header = () => {
  return (
    <header className="header bg-black">

      <div className="container header-container">

        <NavToggle/>
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