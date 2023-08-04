import { useState } from 'react';
import SignUp from './Components/SignUp/SignUp';

interface SignInSignUpProps {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
    setFilter: (value: string) => void;
}

function SignInSignUp({ isSignedIn, setIsSignedIn, setFilter }: SignInSignUpProps) {
    // This state variable 'formData' is used to store data for the sign up form
    const [formData, setFormData] = useState({
        first_Name: '',
        last_Name: '',
        email: '',
        password: '',
    });

    // State variable to control the visibilty of the sign up form
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

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
    return <>
        <div id="sign-up-in-button-container">
            <button id="sign-up-in-button" onClick={() => setFilter('sign-up')}>Sign Up</button>
            </div>
    </>
}

export default SignInSignUp;