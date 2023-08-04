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

    return <>
        <div id="sign-up-in-button-container">
            <button id="sign-up-in-button" onClick={() => setFilter('sign-up')}>Sign Up</button>
            </div>"
    </>
}

export default SignInSignUp;