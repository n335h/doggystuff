import React from 'react';
import './Navbar.css';
import user from '../../Assets/user.svg'


interface SignInIconProps {
  isOpen: boolean;
  toggleMenu: () => void;
  openAdditionalMenu: () => void;
  icon: string; // Add this line to include the icon prop
}

  const SignInIcon: React.FC<SignInIconProps> = ({ isOpen, toggleMenu, openAdditionalMenu, icon}) => {
  
    return (
      <div className={`SignInIcon-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? toggleMenu() : openAdditionalMenu()}>
        <div className="menu">
        {/* <img src={icon === 'hamburgeropen' ? hamburgeropen : hamburgerclose} alt="Hamburger Icon" /> */}
        <img src={user} alt="User Icon" />
    </div>
        </div>
  
    
    );
  };
  
  export default SignInIcon;