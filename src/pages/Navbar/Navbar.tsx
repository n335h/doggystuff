import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../models/client';
import './Navbar.css';
import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import Hamburger from '../Hamburger.tsx/Hamburger';
import SignInIcon from './SignInIcon';
import DoggyStuffLogo from '../Logo/Logo';



interface NavbarProps {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  visible: boolean; // Add the 'visible' prop
}
// const formData = {
//   email: '',
//   password: '',
//   first_name: '',
//   last_name: '',
// }


export default function Navbar({ isSignedIn, setIsSignedIn, visible }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [additionalMenuOpen, setAdditionalMenuOpen] = useState(false);
  const [hamburgerIcon, setHamburgerIcon] = useState('hamburgeropen'); // Default to 'hamburgeropen'
  const [SignInMenuOpen, setSignInMenuOpen] = useState(false);
  // const [SignInIconState, setSignInIconState] = useState('user');
  const [SignInIconState, setSignInIcon] = useState('user');
  const [additionalSignInMenuOpen, setAdditionalSignInMenuOpen] = useState(false);


  // const [showSignUp, setShowSignUp] = useState(false);
  // const [showSignIn, setShowSignIn] = useState(false);
  // const [signUpRedirect, setSignUpRedirect] = useState(false);

  // function handleSignUpClick() {
  //     setShowSignUp(true);
  //     setShowSignIn(false);
  // }

  // function handleSignInClick() {
  //     setShowSignUp(false);
  //     setShowSignIn(true);
  // }

  // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //     setFormData((prevFormData) => {
  //         return {
  //             ...prevFormData,
  //             [event.target.name]: event.target.value,
  //         };
  //     });
  // }
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

  const [isSignedOutHovered, setIsSignedOutHovered] = useState(false);

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
              <Hamburger
                isOpen={menuOpen}
                toggleMenu={handleToggleMenu}
                openAdditionalMenu={handleToggleAdditionalMenu}
                icon={hamburgerIcon}
              />
            </div>
          </div>
          <div className="navbarcenter">
            <DoggyStuffLogo />
            {/* <a href='/' id="navbar-title">DoggyStuff</a> */}
          </div>
          <div className={`authButtons ${additionalMenuOpen ? 'open' : ''}`}>
            {isSignedIn ? (
              <button
                id="dropdown-menu-signout-button"
                onClick={() => {
                  signOut();
                  setIsSignedIn(false);
                }}
                // add hover effect to the sign out button
                onMouseEnter={() => {
                  setIsSignedOutHovered(true);
                }}
                onMouseLeave={() => {
                  setIsSignedOutHovered(false);
                }}
                style={{
                  boxShadow: isSignedOutHovered ? '0 2px 4px rgba(5, 0, 0, 5.1)' : 'none'
                }}
              >
                Sign Out
              </button>
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
                    <div className="additionalSignInMenuContent">
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