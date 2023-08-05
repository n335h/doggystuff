import { useState } from 'react';
import SignUp from './Components/SignUp/SignUp';
import SignIn from "./Components/SignIn/SignIn";
import './SignInSignUp.css';

import Navbar from '../Navbar/Navbar';

interface SignInSignUpProps {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
}

function SignInSignUp({ isSignedIn, setIsSignedIn}: SignInSignUpProps) {
    // This state variable 'formData' is used to store data for the sign up form
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    // State variable to control the visibilty of the sign up form
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);


    // signUpRedirect - used where a new user successfully signs up, 
    // it toggles hiding the sign up component and showing the sign in component
    const [signUpRedirect, setSignUpRedirect] = useState(false);

    function handleSignUpClick() {
        // Event handler for the sign up button
        setShowSignUp(true); // Set showSignUp to true to display the sign up form
        setShowSignIn(false); // Set showSignIn to false to hide the sign in form
    }

    function handleSignInClick() {
        // Event handler for the sign in button
        setShowSignUp(false); // Set showSignIn to true to display the sign in form
        setShowSignIn(true); // Set showSignUp to false to hide the sign up form
    }
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    return <>
        <div id="signInUpcontainer" data-testid="signInUpcontainer">
            {/* <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}  /> */}
          
            <div id="signInUpComponents">
                <div id="sign-up-in-container">
                    <div id="signInUpButtons">
                        <button onClick={handleSignUpClick}>Sign Up</button>
                        <button onClick={handleSignInClick}>Sign In</button>
                    </div>
                
                    {/* Render the SignUp component only if showSignUp is true and signUpRedirect is false */}
                    {showSignUp && !signUpRedirect &&  (<SignUp formData={formData} handleChange={handleChange} setSignUpRedirect={setSignUpRedirect} />)}

                    {/* Render the SignIn component if either showSignIn is true or signUpRedirect is true (where a new user has just signed up) */}
                    {(showSignIn || signUpRedirect ) && (<SignIn formData={formData} handleChange={handleChange} signUpRedirect={signUpRedirect} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>)}
                    
                </div>
            </div>
        </div>
    </>
}

export default SignInSignUp;