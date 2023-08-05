
import './App.css';
import React, { useState } from 'react';
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import SignUp from "../SignInSignUp/Components/SignUp/SignUp"
import { SignUpFormData } from '../SignInSignUp/Components/SignUp/SignUp';
import Navbar from '../Navbar/Navbar';
import { Landing } from '../Landing/Landing';



function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const signInSignUpProps = {
    isSignedIn: isSignedIn,
    setIsSignedIn: setIsSignedIn,
  
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
     <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}  />
    
      <Routes>
      <Route path="/src/pages/signsignup" element={<SignInSignUp isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}/>
      <Route path="/SignUp" element={<SignUp formData={formData} handleChange={handleChange} setSignUpRedirect={setSignUpRedirect} />} />
      </Routes>
      </BrowserRouter>

     
 <Landing />

    </div>
  );
}

export default App;
