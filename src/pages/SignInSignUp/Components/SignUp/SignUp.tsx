import { useState } from 'react';
import { supabaseSignUp } from '../../../../models/queries';

interface FormData {
    name: string;
    email: string;
    password: string;
}

function SignUp({ formData, handleChange, setSignUpRedirect }) {
    // useState to track if SignIn message should be displayed
    const [ signUpSuccess, setSignUpSuccess ] = useState(true);

    // This function is used to handle the form submission.
    // It is triggered when the for is submitted
    async function handleSubmit(e) 
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
        {!signUpSuccess && (<SignMessage message='Sign up failed' />)}

        <form onSubmit={handleSubmit}>
            <label htmlFor='first_name'>First Name</label>
            <input
                type='text'
                name='first_name'
                onChange={handleChange}
                required
            />
        </form>
    </div>
)