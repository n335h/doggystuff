import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInUser } from '../../server/client';
import SignMessage from '../SignMessage/SignMessage';
import { Link } from "react-router-dom";
import './SignIn.css';
import hamburgerclose from '../../Assets/hamburgerclose.svg';

interface SignInProps {
  SignInFormData: {
    email: string;
    password: string;
  };
  signUpRedirect: boolean;
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
}

function SignIn({ SignInFormData, signUpRedirect, isSignedIn, setIsSignedIn }: SignInProps) {
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(true);
  const [signInError, setSignInError] = useState(false);
  const [showSignInSuccessOverlay, setShowSignInSuccessOverlay] = useState(false); // New state variable

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormData(formData);

    const signInSuccessful = await SignInUser(formData.email, formData.password);

    if (signInSuccessful) {
      setIsSignedIn(true);
      setShowSignInSuccessOverlay(true); // Show the sign-in success overlay
      navigate('/Profile');
    console.log('profile loaded');
      setShowSignIn(false);
    
    } else {
      setSignInError(true);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='sign-form '>
      <a id='closeForm' href="/">  <img className='signformclose animate-pop-in ' src={hamburgerclose} alt='close' /></a>
      {showSignIn && (
        <>
          <section className="sign-in">
            <h1 className='signIntitle animate-pop-in'>Sign In</h1>
            <div className="sign-up-link animate-pop-in">
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
            {signInError && <SignMessage message="Failed to sign in." signUpRedirect={false} />}
            {/* Check if signUpRedirect (new user has successfully signed up) has been changed to true and display success message if so */}
            {signUpRedirect && <SignMessage message="Successfully signed up. Please log in." signUpRedirect={true} />}

            <form className='animate-pop-in' onSubmit={handleSubmit}>
              <label htmlFor="email"></label>
              <input
                id='email'
                name="email"
                placeholder='Email'
                type="email"
                onChange={handleChange}
                required
              />
              <label htmlFor="password"></label>
              <input
                name="password"
                placeholder='Password'
                type="password"
                pattern=".{6,}"
                title="Please enter at least 6 characters"
                onChange={handleChange}
                required
              />
              
              <br />
              <p> Forgot your password?</p>
              <div className="submit-button">
                <button type='submit' aria-label="Submit" >Submit</button>
              </div>
            </form>
          </section>
        </>
      )}
      {showSignInSuccessOverlay && (
        <div className="sign-in-overlay">
          <h2>Sign In Successful</h2>
        </div>
      )}
    </div>
  );
}

export default SignIn;
