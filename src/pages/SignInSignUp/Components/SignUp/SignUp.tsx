import { useState } from 'react';
import { supabaseSignUp } from '../../../../models/queries';
import SignMessage from '../SignMessage/SignMessage';

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

    // This function is used to handle the form submission.
    // It is triggered when the for is submitted
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>)    { 
    // e.preventDefault() - prevents the default form submission behavior
    // It ensures that the form does not cause a page reload
    e.preventDefault();

    // Check if Sign up form has been filled out
    if (
        formData.first_name === '' &&
        formData.last_name === '' &&
        formData.email === '' &&
        formData.password === ''
    ) {
        // supabaseSignUp() is called, passing the formData as a parameter
        // This function contains the logic and DB query for creating a new user
        // also sets the signUpSuccess state to true or false
        let checkSuccess = await supabaseSignUp(formData);
        setSignUpSuccess(checkSuccess);
        // if signUpSuccess is true, setSignUpRedirect is called
        if(checkSuccess) {
            setSignUpRedirect(true);
    }
}
}


return ( 
    <div className='sign-form'>
        <h1>Sign Up</h1>

        {/* Check if signUpSuccess has been changed to true and display error if so */}
        {!signUpSuccess && (<SignMessage message='Sign up failed' signUpRedirect={false} />)}

        <form onSubmit={handleSubmit}>
            <label htmlFor='first_name'>First Name</label>
            <input
                id='first_name'           
                type='text'
                name='first_name'
                onChange={handleChange}
                required
            />  <label htmlFor='last_name'>Last Name</label>
            <input
                id='last_name'
               data-testid="lastName-input"
               name="lastName"
               onChange={handleChange}
               required
            />  <label htmlFor='email'>Email</label>
            <input
            id='email'
            data-testid="email-input"
            name="email"
            type="email"
            onChange={handleChange}
            required
            />  <label htmlFor='password'>Password</label>
            <input
          data-testid="password-input"
          name="password"
          type="password"
          pattern=".{6,}"
          title="Please enter at least 6 characters"
          onChange={handleChange}
          required
            />
        </form>
        <button type='submit' aria-label="Submit">Submit</button>
    </div>
)
}

export default SignUp;
