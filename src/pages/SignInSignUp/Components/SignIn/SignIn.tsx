
// import react dependencies
import { useState } from 'react'
// useNavigate() is used to redirect to a different page
import { useNavigate } from 'react-router-dom';
// import MaterialUI dependencies
// import function from client.js
import { SignInUser } from '../../../../models/client';
// import components
import SignMessage from '../../Components/SignMessage/SignMessage';
// import css
import { Link} from "react-router-dom"
interface SignInFormData {
    email: string;
    password: string;
    first_name: string; // Add this property
    last_name: string; // Add this property
  }

// interface for SignIn component
interface SignInProps {
    formData: {
        email: string;
        password: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signUpRedirect: boolean;
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
}


function SignIn({ formData, handleChange, signUpRedirect, isSignedIn, setIsSignedIn }: SignInProps) {    // initialize the navigate object using the useNavigate 'hook'
    const navigate = useNavigate();
    const [showSignIn, setShowSignIn] = useState(true); 
    // useState to track if SignIn error message should be displayed
    const [ signInError, setSignInError ] = useState(false);

    // This function is used to handle the form submission.
    // It is triggered when the form is submitted.
    async function handleSubmit(e   : React.FormEvent<HTMLFormElement>) {
        // The 'e.preventDefault()' prevents the default form submission behavior.
        // It ensures that the form does not cause a page reload.
        e.preventDefault();

        //  Call SignInUser() from Models/client.js and pass in user inputted email and password set the return value to a variable
        const signInSuccessful = await SignInUser(formData.email, formData.password);
        // if (signInSuccessful === true) redirect to Card Display Page
        if (signInSuccessful) {
            setIsSignedIn(true);
            navigate('/src/pages/Landing');
            setShowSignIn(false); // Hide the sign-in component
          }
        // if (signInSuccessful === false) display error message
        else {
            // show SignMessage component
            setSignInError(true);
        }
        
    }

    return (
        <div className='sign-form'>
              <a href="/landing">X</a>
        {showSignIn && (
          <>
            <h1>Sign In</h1>
            <div className="sign-up-link">
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>  
        {/* Check if signInError has been changed to true and display error if so */}
        {signInError && <SignMessage message="Failed to sign in." signUpRedirect={false} />}
        {/* Check if signUpRedirect (new user has successfully signed up) has been changed to true and display success message if so */}
        {signUpRedirect && <SignMessage message="Successfully signed up. Please log in." signUpRedirect={true} />}
  
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
            <input
            id='email'
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
              <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              pattern=".{6,}"
              title="Please enter at least 6 characters"
              onChange={handleChange}
              required
            />
            <br />
       
          <div className="submit-button">
            <button type='submit' aria-label="Submit">Submit</button>
          </div>
        </form>
  
        </>
      )}
    </div>
  );
}
export default SignIn;