import React from 'react';
import './Navbar.css';
import user from '../../Assets/user.svg'
import userClose from '../../Assets/userClose.svg'


interface SignInIconProps {
  isOpen: boolean;
  handleToggleSignInMenu: () => void;
  openAdditionalSignInMenu: () => void;
  icon: string; // Add this line to include the icon prop
}

  const SignInIcon: React.FC<SignInIconProps> = ({ isOpen, handleToggleSignInMenu, openAdditionalSignInMenu, icon}) => {
  
    return (
      <div className={`SignInIcon-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? handleToggleSignInMenu() : openAdditionalSignInMenu()}>
        <div className="menu">
        {/* console.log('user:', user); */}
        {/* <img src={user === 'user' ? user : userClose} alt="User Icon" /> */}
        <img src={user === 'user' ? user : userClose} alt="User Icon" />
    </div>
        </div>
  
    
    );
  };
  
  export default SignInIcon;