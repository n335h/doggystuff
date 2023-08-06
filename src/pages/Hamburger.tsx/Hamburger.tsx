import React from 'react';
import './Hamburger.css';

interface HamburgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    openAdditionalMenu: () => void; // Callback to open additional menu
  }
  
  const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu, openAdditionalMenu }) => {
    return (
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? toggleMenu() : openAdditionalMenu()}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    );
  };
  
  export default HamburgerMenu;