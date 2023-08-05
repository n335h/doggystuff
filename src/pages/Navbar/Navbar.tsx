// import css

// import react dependencies
import { useState } from 'react';
import { Link } from "react-router-dom";
// import Supabase functions
import { signOut } from '../../models/client';
// import MaterialUI dependencies

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
    <div id="navbar-outer-container" >
      <div id="navbar-header-container" >    
                {/* <Link id="dropdown-createagroup-link" to="">Create a Group</Link> */}
                <button id="dropdown-menu-signout-button" onClick={() => { signOut(); setIsSignedIn(false); }}>
                  Sign Out
                </button>
              </div>
              <div id={idSignedoutVariable}>
                <button  id="dropdown-menu-susi-button">
                  <Link to="/src/pages/signsignup">
                    Sign Up / Sign In
                  </Link>
                </button>
              </div>   
            </div>
  );
}