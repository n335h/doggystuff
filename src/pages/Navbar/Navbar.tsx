  import React, { useState, useEffect, useRef } from 'react';
  import { Link } from 'react-router-dom';
  import { signOut } from '../../models/client';
  import './Navbar.css';
  // import SignInSignUp from '../SignInSignUp/SignInSignUp';
  import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
  import Hamburger from '../Hamburger.tsx/Hamburger';







  interface NavbarProps {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
    visible: boolean; // Add the 'visible' prop
  }
  interface SignInProps { 
    signInFormData: SignInFormData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signUpRedirect: boolean; // Change this to boolean type
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
  }
  interface SignInFormData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  export const formData: SignInFormData = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  };

  export default function Navbar({ isSignedIn, setIsSignedIn, visible }: NavbarProps, {signInFormData, handleChange, signUpRedirect}: SignInProps ) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [additionalMenuOpen, setAdditionalMenuOpen] = useState(false);
    const [hamburgerIcon, setHamburgerIcon] = useState('hamburgeropen'); // Default to 'hamburgeropen'

    const navbarRef = useRef<HTMLElement>(null); // Create a ref for the navbar element

    const handleToggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const handleToggleAdditionalMenu = () => {
      setAdditionalMenuOpen(!additionalMenuOpen);
      setHamburgerIcon(additionalMenuOpen ? 'hamburgeropen' : 'hamburgerclose');
    };
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

    return (
      <NavbarBs
        className={`shadow-sm mb-3 ${visible ? '' : 'navbar-hidden'}`}
        sticky="top"
        id="navbar-container"
        ref={navbarRef} // Attach the ref to the navbar element
      >
        <Container>
          <Nav className="navbar me-auto">
      
              <div className="navbarleft">
              <div className="navbarleft">
    <Hamburger isOpen={menuOpen} toggleMenu={handleToggleMenu} openAdditionalMenu={handleToggleAdditionalMenu} icon={hamburgerIcon} />
  </div>            </div>
              <div className="navbarcenter">
                <a  href='/' id="navbar-title">DoggyStuff</a>
              </div>
              <div className={`authButtons ${additionalMenuOpen ? 'open' : ''}`}>
                {isSignedIn ? (
                  <button
                    id="dropdown-menu-signout-button"
                    onClick={() => {
                      signOut();
                      setIsSignedIn(false);
                    }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <div className="sign-in-container">

                    <a href="/SignIn" id="dropdown-menu-signin-button">
                      Sign In
                    </a>
                    <a href="/SignUp" id="dropdown-menu-signup-button">
                      Sign Up
                    </a>


                  {/* <SignUp
                    formData={formData}
                    handleChange={(event) => console.log(event)}
                    setSignUpRedirect={() => console.log('Sign up redirect')}
                    isSignedIn={isSignedIn}
                  />
                  <SignIn
  signInFormData={formData}
  handleChange={(event) => console.log(event)}
  signUpRedirect={false} // Provide the appropriate boolean value here
  isSignedIn={isSignedIn}
  setIsSignedIn={setIsSignedIn}
/> */}
                </div>
                )}
              </div>
              {/* Add your additional menu content here */}
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
                      <Link to="/about" onClick={handleToggleAdditionalMenu}>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq" onClick={handleToggleAdditionalMenu}>
                        FAQ
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