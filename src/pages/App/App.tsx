
import './App.css';
import React, { useState } from 'react';
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import SignUp from "../SignInSignUp/Components/SignUp/SignUp"
import { SignUpFormData } from '../SignInSignUp/Components/SignUp/SignUp';



function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [filter, setFilter] = useState('');

  const signInSignUpProps = {
    isSignedIn: isSignedIn,
    setIsSignedIn: setIsSignedIn,
    setFilter: setFilter,
  };

  // Example form data for sign up form
  const formData: SignUpFormData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

// Example handleChange function for sign up form
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
};

const setSignUpRedirect = (value: boolean) => {
};

  return (
    <div className="App">
      <BrowserRouter>
      <SignInSignUp {...signInSignUpProps}/>
      <Routes>
      <Route path="/SignUp" element={<SignUp formData={formData} handleChange={handleChange} setSignUpRedirect={setSignUpRedirect} />} />
      </Routes>
      </BrowserRouter>
     


 <h1>hello this is the app</h1>


    </div>
  );
}

export default App;
