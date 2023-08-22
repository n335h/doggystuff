import React from 'react';
import DOGGYSTUFF_LOGO_4 from '../../Assets/DOGGYSTUFF_LOGO_4.png'
import './Logo.css';


// interface DoggyStuffLogoProps {
//   isOpen: boolean;
//   toggleMenu: () => void;
//   openAdditionalMenu: () => void;
//   icon: string; // Add this line to include the icon prop
// }

  const DoggyStuffLogo: React.FC = () => {
  
    return (
      <div className="doggyStuff-logo" >
        <div className="logo">
        <img src={DOGGYSTUFF_LOGO_4} alt="Doggy Stuff Logo" />
    </div>
        </div>
  
    
    );
  };
  
  export default DoggyStuffLogo;