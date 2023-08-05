import { useState } from 'react';
import { supabaseSignUp } from '../../../../models/queries';
import SignMessage from '../SignMessage/SignMessage';
import { sign } from 'crypto';

// Interface for FormData
export interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// Define prop types for SignUp component
interface SignUpProps {
  formData: SignUpFormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSignUpRedirect: (value: boolean) => void;
}

function SignUp({ formData, handleChange, setSignUpRedirect }: SignUpProps) {
  // useState to track if SignIn message should be displayed
  const [signUpSuccess, setSignUpSuccess] = useState(true);

  // on click of submit button, handleSubmit is called
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    console.log(signUpSuccess);
    console.log("function called")

    // Check if Sign up form has been filled out
    if (
      formData.first_name !== '' &&
      formData.last_name !== '' &&
      formData.email !== '' &&
      formData.password !== ''
    ) {
      console.log(formData);

      // supabaseSignUp() is called, passing the formData as a parameter
      // This function contains the logic and DB query for creating a new user
      // also sets the signUpSuccess state to true or false
      let checkSuccess = await supabaseSignUp(formData);
      setSignUpSuccess(checkSuccess);
      console.log(signUpSuccess);

      // if signUpSuccess is true, setSignUpRedirect is called
      if (checkSuccess) {
        setSignUpRedirect(true);
        
      }
    }
  }
  

  return (
    <div className='sign-form'>
      <h1>Sign Up</h1>

      {/* Check if signUpSuccess has been changed to true and display error if so */}
      {!signUpSuccess && <SignMessage message='Sign up failed' signUpRedirect={false} />}

      <form onSubmit={handleSubmit}>
        <label htmlFor='first_name'>First Name</label>
        <input id='first_name' type='text' name='first_name' onChange={handleChange} required />
        <label htmlFor='last_name'>Last Name</label>
        <input
          id='last_name'
          data-testid='lastName-input'
          name='last_name'
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          data-testid='email-input'
          name='email'
          type='email'
          onChange={handleChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          data-testid='password-input'
          name='password'
          type='password'
          pattern='.{6,}'
          title='Please enter at least 6 characters'
          onChange={handleChange}
          required
        />
        <button type='submit' auto-complete="current-password" aria-label='Submit' data-testid='submit-button' className='submit-button'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;