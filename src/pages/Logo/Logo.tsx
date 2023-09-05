import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DOGGYSTUFF_LOGO_12 from '../../Assets/DOGGYSTUFF_LOGO_12.svg';
import './Logo.css';

type Props = {
  // Props type definition
  newColor: string;
};

const DoggyStuffLogo: React.FC = () => {
  const [currentColorClass, setCurrentColorClass] = useState<string>('color1'); // Set an initial class

  useEffect(() => {
    const sectionHeight = window.innerHeight;
    const section1Start = 0;
    const section1End = sectionHeight;
    const section2Start = sectionHeight;
    const section2End = 2 * sectionHeight;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentSection;

      if (scrollY >= section1Start && scrollY < section1End) {
        currentSection = 1;
        console.log('currentSection', currentSection);
      } else if (scrollY >= section2Start && scrollY < section2End) {
        currentSection = 2;
        console.log('currentSection', currentSection);
      }
      // Add more conditions and color classes as needed

      let newColor;

      if (currentSection === 1) {
        newColor= 'logo1'; // Set the desired color
        console.log('newColor', newColor);
      } else if (currentSection === 2) {
        newColor =  'logo2'; // Set the desired color
        console.log('newColor2', newColor);
      }

      // Get the path element by its ID
      const pathElement = document.getElementById('path1');
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
    <div className="doggyStuff-logo">
      <div className="logo">
        <Link to="/">
          <img
          id='path1'
            src={DOGGYSTUFF_LOGO_12}
            alt="Doggy Stuff Logo"
            className={`svg-icon ${currentColorClass}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default DoggyStuffLogo;
