
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

  // interface for SignIn component
  interface SignInProps {
      SignInFormData: {
          email: string;
          password: string;
      };

      signUpRedirect: boolean;
      isSignedIn: boolean;
      setIsSignedIn: (value: boolean) => void;
  }

  // const INITIAL_SIGNIN_DATA: SignInFormData = {
  //   email: '',
  //   password: '',

  // }


  function SignIn({SignInFormData, signUpRedirect, isSignedIn, setIsSignedIn }: SignInProps) {    // initialize the navigate object using the useNavigate 'hook'
    
    

    const navigate = useNavigate();
      const [showSignIn, setShowSignIn] = useState(true); 
      

      // useState to track if SignIn error message should be displayed
      const [ signInError, setSignInError ] = useState(false);
      // const [signInformData, setSignInFormData] = useState(INITIAL_SIGNIN_DATA);

      const [formData, setFormData] = useState({
       email: '',
       password: '',
       });
      // This function is used to handle the form submission.
      // It is triggered when the form is submitted.
      async function handleSubmit(e   : React.FormEvent<HTMLFormElement>) {
          // The 'e.preventDefault()' prevents the default form submission behavior.
          // It ensures that the form does not cause a page reload.
          e.preventDefault();
        setFormData(formData)
        console.log(formData)
        
          const signInSuccessful = await SignInUser(formData.email, formData.password);
          // if (signInSuccessful === true) redirect to Card Display Page
          if (signInSuccessful) {
              setIsSignedIn(true);
              alert('You have successfully signed in!');
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
       setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(formData.email)
        console.log(formData.password)
        console.log(formData)
      };
      return (
          <div className='sign-form '>
            <a id='closeForm' href="/">X</a>
          {showSignIn && (
            <>
              <h1 className='signIntitle animate-pop-in'>Sign In</h1>
              <div className="sign-up-link animate-pop-in">
                <Link  to="/signup">Don't have an account? Sign up</Link>
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
    
          </>
        )}
      </div>
    );
  }
  export default SignIn;