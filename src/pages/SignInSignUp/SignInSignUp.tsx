import React, { useState } from 'react';
import SignUp from './Components/SignUp/SignUp';
import SignIn from "./Components/SignIn/SignIn";
import './SignInSignUp.css';
import user from '../../Assets/user.svg';

interface SignInSignUpProps {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
}

function SignInSignUp({ isSignedIn, setIsSignedIn }: SignInSignUpProps) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [signUpRedirect, setSignUpRedirect] = useState(false);

    function handleSignUpClick() {
        setShowSignUp(true);
        setShowSignIn(false);
    }

    function handleSignInClick() {
        setShowSignUp(false);
        setShowSignIn(true);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    return (
        <div id="signInUpcontainer" data-testid="signInUpcontainer">
            <div id="signInUpComponents">
                <div id="signInUpButtons">
                    <button id='SignUp' onClick={handleSignUpClick}>Sign Up</button>
                    <button id='SignIn' onClick={handleSignInClick}><img id='SignIn' src={user} alt='user'/></button>
                </div>

                {showSignUp && !signUpRedirect &&  (
                    <SignUp formData={formData} handleChange={handleChange} setSignUpRedirect={setSignUpRedirect} />
                )}

                {(showSignIn || signUpRedirect ) && (
                    <SignIn
                        signInFormData={formData}  // Pass the formData here
                        handleChange={handleChange}
                        signUpRedirect={signUpRedirect}
                        isSignedIn={isSignedIn}
                        setIsSignedIn={setIsSignedIn}
                    />
                )}
            </div>
        </div>
    );
}

export default SignInSignUp;
