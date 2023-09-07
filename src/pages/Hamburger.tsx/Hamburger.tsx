  import React from 'react';
  import { useState, useEffect } from 'react';
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
      const [currentColorClass] = useState<string>('logo1'); // Set an initial class

  
      useEffect(() => {
        const sectionHeight = window.innerHeight;
        const section1Start = 0;
        const section1End = sectionHeight;
        const section2Start = sectionHeight;
        const section2End = 2 * sectionHeight;
        const section3Start = 2 * sectionHeight;
        const section3End = 3 * sectionHeight;
        const section4Start = 3 * sectionHeight;
        const section4End = 4 * sectionHeight;

    
    
        const handleScroll = () => {
          const scrollY = window.scrollY;
          let currentSection;
    
          if (scrollY >= section1Start && scrollY < section1End) {
            currentSection = 1;
            console.log('currentSection', currentSection);
          } else if (scrollY >= section2Start && scrollY < section2End) {
            currentSection = 2;
            console.log('currentSection', currentSection);
          } else if (scrollY >= section3Start && scrollY < section3End) {
            currentSection = 3;
            console.log('currentSection', currentSection);
          } else if (scrollY >= section4Start && scrollY < section4End) {
            currentSection = 4;
            console.log('currentSection', currentSection);
          }

          // Add more conditions and color classes as needed
    
          let newColor = 'logo1'; // Set the default color
    
          if (currentSection === 1) {
            newColor= 'logo1'; // Set the desired color
            console.log('newColor', newColor);
          } else if (currentSection === 2) {
            newColor =  'logo2'; // Set the desired color
            console.log('newColor2', newColor);
          }else if (currentSection === 3) {
            newColor =  'logo3'; // Set the desired color
            console.log('newColor3', newColor);
          } else if (currentSection === 4) {
            newColor =  'logo4'; // Set the desired color
            console.log('newColor4', newColor);
          }
    
          // Get the path element by its ID
          const pathElement = document.getElementById('hamburger');
          console.log('pathElement', pathElement);
    
          if (pathElement) {
            // Ensure newColor is string to provide a default value
            const colorToSet = newColor || ''; // Set the color to an empty string if it is undefined
            // Update the fill attribute of the path element
            pathElement.setAttribute('class', colorToSet);
            console.log('pathElement', pathElement);
          } else {
            console.error('pathElement is undefined'); // Handle the case where pathElement is not found
          }
        };      
        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      return (
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={() => isOpen ? toggleMenu() : openAdditionalMenu()}>
          <div className="menu">
          <img id='hamburger' className={`svg-icon ${currentColorClass}`} src={icon === 'hamburgeropen' ? hamburgeropen : hamburgerclose} alt="Hamburger Icon" />
      </div>
          </div>
    
      
      );
    };
    
    export default HamburgerMenu;