// import css

// import react dependencies
import { useState } from 'react';
import { Link } from "react-router-dom";
// import Supabase functions
import { signOut } from '../../models/client';
// import MaterialUI dependencies
import './Navbar.css'
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import { Sign } from 'crypto';

interface NavbarProps {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;


}


export default function Navbar({ isSignedIn, setIsSignedIn}: NavbarProps) {
 

  // Vary components displayed in dropdown menu depending on whether user is signed in using css
  let idSignedinVariable;
  let idSignedoutVariable;
  if(isSignedIn === true) {
    idSignedinVariable = "dropdown-menu-signedin";
    idSignedoutVariable = "dropdown-menu-signedin-toggle"
  }
  else {
    idSignedinVariable = "dropdown-menu-signedin-toggle";
  }

  return (
    <div id="navbar-outer-container">
       
<div className='navbarleft'>

</div>
<div className='navbarcenter'>
    <h1 id='navbar-title'>DoggyStuff</h1>
</div>
<div className="authButtons">
        {isSignedIn ? ( // Check if user is signed in
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
          <SignInSignUp isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        )}
      </div>
    </div>
  );
}