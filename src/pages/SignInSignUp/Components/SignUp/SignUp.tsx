import { useState } from 'react';
import { supabaseSignUp } from '../../../../models/queries';
// import { insertPublicUser } from '../../../../models/queries';
import SignMessage from '../SignMessage/SignMessage';
import { Link } from 'react-router-dom';
import './SignUp.css';

// interface SignUpFormData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
// }

interface SignUpProps {
  SignUpFormData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };

  setSignUpRedirect: (value: boolean) => void;
  isSignedIn: boolean;
}



function SignUp({

  setSignUpRedirect,

}: SignUpProps) {
  const [signUpSuccess, setSignUpSuccess] = useState(true);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(formData);
    console.log('submit clicked')
    console.log(formData);
    console.log('Submitting form')


    if (
      formData.first_name !== '' &&
      formData.last_name !== '' &&
      formData.email !== '' &&
      formData.password !== ''

    ) {
      let checkSuccess = await supabaseSignUp(formData)

      setSignUpSuccess(checkSuccess);

      if (checkSuccess) {
        setSignUpRedirect(true);
      }
    }
    alert('Sign up successful');
    window.location.href = '/'; // Change the URL as needed
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
    console.log(value)
    console.log(formData)
    console.log('Updating handleChange')
  };



  return (
    <div className='sign-form1'>
      <a id='closeForm' href='/'>
        X
      </a>

      <h1 className='signUpTitle animate-pop-in'>Sign Up</h1>
      <div className='sign-in-link animate-pop-in'>
        <Link to='/signin'>Already have an account? Sign in</Link>
      </div>
      {!signUpSuccess && <SignMessage message='Sign up failed' signUpRedirect={false} />}

      <form className='signUpForm animate-pop-in' onSubmit={handleSubmit}>
        <label htmlFor='first_name'></label>
        <input placeholder='First Name' id='first_name' type='text' name='first_name' onChange={handleChange} required />
        <label htmlFor='last_name'></label>
        <input
          id='last_name'
          placeholder='last Name'
          data-testid='lastName-input'

          name='last_name'
          onChange={handleChange}
          required
        />
        <label htmlFor='email'></label>
        <input
          id='email'
          placeholder='Email'
          data-testid='email-input'

          name='email'
          type='email'
          onChange={handleChange}
          required
        />
        <label htmlFor='password'></label>
        <input
          data-testid='password-input'
          name='password'
          placeholder='Password'
          type='password'
          pattern='.{6,}'
          title='Please enter at least 6 characters'
          onChange={handleChange}
          required
        />
        <br />
        <div className="submit-button">
        <button type='submit' auto-complete='current-password' aria-label='Submit' data-testid='submit-button' className='submit-button'>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}


export default SignUp;