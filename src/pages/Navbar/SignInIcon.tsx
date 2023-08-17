import React from 'react';
import './Navbar.css';
import user from '../../Assets/user.svg'
import userClose from '../../Assets/userClose.svg'


interface SignInIconProps {
  isOpen: boolean;
  ToggleSignInMenu: () => void;
  openAdditionalSignInMenu: () => void;
  icon: string; // Add this line to include the icon prop
}

  const SignInIcon: React.FC<SignInIconProps> = ({ isOpen, ToggleSignInMenu, openAdditionalSignInMenu, icon}) => {
  
    return (
      <div className={`SignInIcon-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? ToggleSignInMenu() : openAdditionalSignInMenu()}>
        <div className="menu">
        {/* console.log('user:', user); */}
        <img src={icon === 'user' ? user : user} alt="User Icon" />
    </div>
        </div>
  
    
    );
  };
  
  export default SignInIcon;