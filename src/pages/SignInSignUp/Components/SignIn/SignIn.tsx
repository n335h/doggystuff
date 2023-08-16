
  // import react dependencies
  import { useState } from 'react'
  // useNavigate() is used to redirect to a different page
  import { useNavigate } from 'react-router-dom';
  // import function from client.js
  import { SignInUser } from '../../../../models/client';
  // import components
  import SignMessage from '../../Components/SignMessage/SignMessage';
  // import css
  import { Link} from "react-router-dom"
  import './SignIn.css'
 interface SignInFormData {
    email: string;
    password: string;
  }

  // interface for SignIn component
  interface SignInProps {
      signInFormData: {
          email: string;
          password: string;
      };
      handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      signUpRedirect: boolean;
      isSignedIn: boolean;
      setIsSignedIn: (value: boolean) => void;
  }

  const INITIAL_SIGNIN_DATA: SignInFormData = {
    email: '',
    password: '',

  }


  function SignIn({signInFormData, signUpRedirect, isSignedIn, setIsSignedIn }: SignInProps) {    // initialize the navigate object using the useNavigate 'hook'
    
    

    const navigate = useNavigate();
      const [showSignIn, setShowSignIn] = useState(true); 
      

      // useState to track if SignIn error message should be displayed
      const [ signInError, setSignInError ] = useState(false);
      const [signInformData, setSignInFormData] = useState(INITIAL_SIGNIN_DATA);

      // This function is used to handle the form submission.
      // It is triggered when the form is submitted.
      async function handleSubmit(e   : React.FormEvent<HTMLFormElement>) {
        setSignInFormData(signInFormData)
          // The 'e.preventDefault()' prevents the default form submission behavior.
          // It ensures that the form does not cause a page reload.
          e.preventDefault();
          const signInSuccessful = await SignInUser(signInFormData.email, signInFormData.password);
          // if (signInSuccessful === true) redirect to Card Display Page
          if (signInSuccessful) {
              setIsSignedIn(true);
              navigate('/');
              setShowSignIn(false); // Hide the sign-in component
            }
          // if (signInSuccessful === false) display error message
          else {
              // show SignMessage component
              setSignInError(true);
          }
          
      }
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignInFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(signInFormData.email)
        console.log(signInFormData.password)
        console.log(signInFormData)
      };
      return (
          <div className='sign-form '>
            <a id='closeForm' href="/">X</a>
          {showSignIn && (
            <>
              <h1 className='signIntitle animate-pop-in'>Sign In</h1>
              <div className="sign-up-link animate-pop-in">
                <Link to="/signup">Don't have an account? Sign up</Link>
              </div>  
          {/* Check if signInError has been changed to true and display error if so */}
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
                value={signInFormData.email}
                onChange={handleChange}
                required
              />
                <label htmlFor="password"></label>
              <input
                name="password"
                placeholder='Password'
                type="password"
                pattern=".{6,}"
                value={signInFormData.password}
                title="Please enter at least 6 characters"
                onChange={handleChange}
                required
              />
              <br />
        
            <div className="submit-button">
              <button type='submit' aria-label="Submit" >Submit</button>
            </div>
          </form>
    
          </>
        )}
      </div>
    );
  }
  export default SignIn;