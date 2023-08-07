import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../models/client';
import './Navbar.css';
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import Hamburger from '../Hamburger.tsx/Hamburger';


interface NavbarProps {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  visible: boolean; // Add the 'visible' prop
}

export default function Navbar({ isSignedIn, setIsSignedIn, visible }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [additionalMenuOpen, setAdditionalMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null); // Create a ref for the navbar element

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleAdditionalMenu = () => {
    setAdditionalMenuOpen(!additionalMenuOpen);
  };

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const navbarElement = navbarRef.current;
      if (!navbarElement) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        navbarElement.style.top = '-80px';
      } else {
        navbarElement.style.top = '0';
      }
      lastScrollTop = scrollTop;
    };

    let lastScrollTop = 0;

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
              <Hamburger isOpen={menuOpen} toggleMenu={handleToggleMenu} openAdditionalMenu={handleToggleAdditionalMenu} />
            </div>
            <div className="navbarcenter">
              <h1 id="navbar-title">DoggyStuff</h1>
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
                <SignInSignUp isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
              </div>
              )}
            </div>
            {/* Add your additional menu content here */}
            {additionalMenuOpen && (
              <div className="additionalMenu">
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
            )}
  
        </Nav>
      </Container>
    </NavbarBs>
  );
}