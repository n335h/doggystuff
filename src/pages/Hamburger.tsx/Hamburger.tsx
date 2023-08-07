import React from 'react';
import './Hamburger.css';
import hamburgeropen from '../../Assets/hamburgeropen.svg'

interface HamburgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    openAdditionalMenu: () => void; // Callback to open additional menu
  }
  
  const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu, openAdditionalMenu }) => {
    return (
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? toggleMenu() : openAdditionalMenu()}>
        <div className="menu">
          <img src={hamburgeropen} alt="menu" />
        </div>
   
      </div>
    );
  };
  
  export default HamburgerMenu;