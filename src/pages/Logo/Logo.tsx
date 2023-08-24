import React from 'react';
import { Link } from 'react-router-dom';
import DOGGYSTUFF_LOGO_12 from '../../Assets/DOGGYSTUFF_LOGO_12.svg'
import './Logo.css';


// interface DoggyStuffLogoProps {
//   isOpen: boolean;
//   toggleMenu: () => void;
//   openAdditionalMenu: () => void;
//   icon: string; // Add this line to include the icon prop
// }

  const DoggyStuffLogo: React.FC = () => {
  // link svg to home page
    return (
      <div className="doggyStuff-logo" >
        <div className="logo">
          <Link to="/">
            <img src={DOGGYSTUFF_LOGO_12} alt="Doggy Stuff Logo" />
          </Link>
        {/* <img src={DOGGYSTUFF_LOGO_12} alt="Doggy Stuff Logo" /> */}
    </div>
        </div>
  
    
    );
  };
  
  export default DoggyStuffLogo;