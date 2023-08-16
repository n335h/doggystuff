  import React from 'react';
  import './Hamburger.css';
  import hamburgeropen from '../../Assets/hamburgeropen.svg'
  import hamburgerclose from '../../Assets/hamburgerclose.svg'


  interface HamburgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    openAdditionalMenu: () => void;
    icon: string; // Add this line to include the icon prop
  }

    const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu, openAdditionalMenu, icon}) => {
    
      return (
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? toggleMenu() : openAdditionalMenu()}>
          <div className="menu">
          <img src={icon === 'hamburgeropen' ? hamburgeropen : hamburgerclose} alt="Hamburger Icon" />
      </div>
          </div>
    
      
      );
    };
    
    export default HamburgerMenu;