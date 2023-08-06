import React, { useState, useEffect,useRef } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import SignUp, { SignUpFormData } from '../SignInSignUp/Components/SignUp/SignUp';
import Navbar from '../Navbar/Navbar';
import { Landing } from '../Landing/Landing';
import { Container } from 'react-bootstrap';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [visible, setVisible] = useState(true);
 
  const prevScrollPosRef = useRef(0);  

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = currentScrollPos < prevScrollPosRef.current; // Show navbar on scroll up

      prevScrollPosRef.current = currentScrollPos; // Update the ref with the current scroll position
      setVisible(isVisible);
      console.log(currentScrollPos);
      console.log(prevScrollPosRef.current);
      console.log(isVisible);
    };
  
    // Set the initial scroll position on moun
    setVisible(true);
   
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  // Example form data for sign up form
  const formData: SignUpFormData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  // Example handleChange function for sign up form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const setSignUpRedirect = (value: boolean) => {};

  return (
    <Container className='mb-4'>
      <div className="App">
        <BrowserRouter>
          <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} visible={visible} />

          <Routes>
            <Route path="/src/pages/signsignup" element={<SignInSignUp isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
            <Route
              path="/SignUp"
              element={<SignUp formData={formData} handleChange={handleChange} setSignUpRedirect={setSignUpRedirect} />}
            />
          </Routes>
        </BrowserRouter>

        <Landing />
      </div>
    </Container>
  );
}

export default App;
