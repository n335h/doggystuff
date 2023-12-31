import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../models/client';
import './Navbar.css';
import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import Hamburger from '../Hamburger.tsx/Hamburger';
import SignInIcon from './SignInIcon';
import DoggyStuffLogo from '../Logo/Logo';
import user from '../../Assets/user.svg';
// import { useLocation } from 'react-router-dom';



interface NavbarProps {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  visible: boolean; // Add the 'visible' prop
}


export default function Navbar({ isSignedIn, setIsSignedIn, visible }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [additionalMenuOpen, setAdditionalMenuOpen] = useState(false);
  const [hamburgerIcon, setHamburgerIcon] = useState('hamburgeropen'); // Default to 'hamburgeropen'
  const [SignInMenuOpen, setSignInMenuOpen] = useState(false);
  const [SignInIconState, setSignInIcon] = useState('user');
  const [additionalSignInMenuOpen, setAdditionalSignInMenuOpen] = useState(false);
  const [currentColorClass] = useState<string>('logo1'); // Set an initial class
  const [currentColorClass2] = useState<string>('signedinicon1'); // Set an initial class

  const navbarRef = useRef<HTMLElement>(null); // Create a ref for the navbar element

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleAdditionalMenu = () => {
    setAdditionalMenuOpen(!additionalMenuOpen);
    setHamburgerIcon(additionalMenuOpen ? 'hamburgeropen' : 'hamburgerclose');
  };

  const handleToggleSignInMenu = () => {
    setSignInMenuOpen(!SignInMenuOpen);
  };

  const handleToggleAdditionalSignInMenu = () => {
    setAdditionalSignInMenuOpen(!additionalSignInMenuOpen);
    setSignInIcon(additionalSignInMenuOpen ? 'user' : 'userClose');
  };

  // Add the 'useEffect' hook to handle the hover effect
  
  
  // const [isSignedOutHovered, setIsSignedOutHovered] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const navbarElement = navbarRef.current;
      if (!navbarElement) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop; // Get the scroll position of the page (y-axis)
      if (scrollTop > lastScrollTop) { // If the scroll position is greater than the last scroll position, hide the navbar
        navbarElement.style.top = '-80px'; // Set the top style to -80px (height of the navbar)
      } else {// If the scroll position is less than the last scroll position, show the navbar
        navbarElement.style.top = '0'; // Set the top style to 0
      }
      lastScrollTop = scrollTop; // Update the last scroll position to the current scroll position
    };

    let lastScrollTop = 0; // Variable to store the last scroll position

    // Add the scroll event listener on mount
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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

    
 // handle scroll for nav bar svgs
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentSection;

      if (scrollY >= section1Start && scrollY < section1End) {
        currentSection = 1;
      } else if (scrollY >= section2Start && scrollY < section2End) {
        currentSection = 2;
      }
      else if (scrollY >= section3Start && scrollY < section3End) {
        currentSection = 3;
      } else if (scrollY >= section4Start && scrollY < section4End) {
        currentSection = 4;
      }
      // Add more conditions and color classes as needed

      let newColor = 'logo1'; // Set the default color
      let newSignOutColor = 'signedinicon1';

      if (currentSection === 1) {
        newColor= 'logo1'; // Set the desired color
        newSignOutColor = 'signedinicon1';
      } else if (currentSection === 2) {
        newColor =  'logo2'; // Set the desired color
        newSignOutColor = 'signedinicon2';
      } else if (currentSection === 3) {
        newColor =  'logo3'; // Set the desired color
        newSignOutColor = 'signedinicon3';
      } else if (currentSection === 4) {
        newColor =  'logo4'; // Set the desired color
        newSignOutColor = 'signedinicon4';
      }

      // Get the path element by its ID
      const pathElement = document.getElementById('profileicon');
      const pathElement2 = document.getElementById('dropdown-menu-signout-button');

      if (pathElement && pathElement2) {
        // Ensure newColor is string to provide a default value
        const colorToSet = newColor || ''; // Set the color to an empty string if it is undefined
        // Update the fill attribute of the path element
        const colorToSet2 = newSignOutColor || ''; // Set the color to an empty string if it is undefined
        pathElement.setAttribute('class', colorToSet);
        pathElement2.setAttribute('class', colorToSet2);
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
    <NavbarBs
      className={` ${visible ? '' : 'navbar-hidden'}`}
      sticky="top"
      id="navbar-container"
      ref={navbarRef} // Attach the ref to the navbar element
    >
      <Container className='outerNav'>
        <Nav className="navbar me-auto">

            <div className="navbarleft">
              <Hamburger
                isOpen={menuOpen}
                toggleMenu={handleToggleMenu}
                openAdditionalMenu={handleToggleAdditionalMenu}
                icon={hamburgerIcon}
              />
            </div>
      
          <div className="navbarcenter">
            <DoggyStuffLogo />
            {/* <a href='/' id="navbar-title">DoggyStuff</a> */}
          </div>
          <div className={`authButtons ${additionalMenuOpen ? 'open' : ''}`}>
            {isSignedIn ? (
              <div className='signedinnav'>
                <button
                  id="dropdown-menu-signout-button"
                  className={`signedinicon ${currentColorClass2}`}
                  onClick={() => {
                    signOut();
                    setIsSignedIn(false);
                  }}
                >
                  Sign Out
                </button>
                <Link to="/profile" >
                <img  id='profileicon'  className={`signedinicon ${currentColorClass}`} src={user} alt="Additional" /> 
                </Link>
              </div>
            ) : (
              <div className="sign-in-container">
                <SignInIcon
                  isOpen={SignInMenuOpen}
                  ToggleSignInMenu={handleToggleSignInMenu}
                  openAdditionalSignInMenu={handleToggleAdditionalSignInMenu}
                  icon={SignInIconState}
                  
                />
            
                {additionalSignInMenuOpen && (
                  <div className="additionalSignInMenu">
                      <ul>
                        <li>
                          <Link to="/signin" onClick={handleToggleAdditionalSignInMenu}>
                            Sign In
                          </Link>
                        </li>
                        <li>
                          <Link to="/signup" onClick={handleToggleAdditionalSignInMenu}>
                            Sign Up
                          </Link>
                        </li>
                      </ul>
                  
                  </div>
                )}
                {/* {showSignUp && !signUpRedirect &&  (
                  <SignUp
                    SignUpFormData={formData}
              
                    setSignUpRedirect={setSignUpRedirect}
                    isSignedIn={isSignedIn} 
                  />)}
                {(showSignIn || signUpRedirect ) && (
                   <SignIn
                   SignInFormData={formData}  // Pass the formData here
        
                  signUpRedirect={signUpRedirect}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                            />
              )} */}
                {/* <a href="/signup" className="signup">sign up</a> */}
                {/* <a href="/signin" className="signin"> sign in</a> */}

              </div>
            )}
          </div>
          {additionalMenuOpen && (
            <div className="additionalMenu">

              <div className="additionalMenuContent">
                <ul>
                  <li>
                    <Link to="/" onClick={handleToggleAdditionalMenu}>

                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleToggleAdditionalMenu}>

                    </Link>
                  </li>
                  <li>
                    <Link to="/getstarted" onClick={handleToggleAdditionalMenu}>
                      Join DoggyStuff
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/about" onClick={handleToggleAdditionalMenu}>
                      About us
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/faq" onClick={handleToggleAdditionalMenu}>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={handleToggleAdditionalMenu}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          )}

        </Nav>
      </Container>
    </NavbarBs>
  );
}