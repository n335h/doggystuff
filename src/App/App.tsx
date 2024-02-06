import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Survey from '../pages/Survey/formPages/Survey';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Navbar from '../components/Navbar/Navbar';
import { Landing } from '../pages/Landing/Landing';
import { Container } from 'react-bootstrap';
import GetStarted from '../pages/getStarted/getStarted';
import Profile from '../pages/Profile/Profile';
import FAQ from '../pages/FAQ/FAQ';
import Contact from '../pages/Contact/Contact';
import { SignInFormData, SignUpFormData, DogFormData, OrderData } from '../types/formData';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [dogData, setDogData] = useState<DogFormData>({
    dog_name: '',
    dog_age: '',
    dog_sex: '',
    dog_breed: '',
    pure_cross: '',
    dog_health: '',
    dog_weight: '',
    dog_size: '',
    flavours_not: [],
    veg: '',
  });
  const [orderData, setOrderData] = useState<OrderData>({
    days: '',
    address_fl: '',
    address_sl: '',
    address_town: '',
    address_county: '',
    address_postcode: '',
    delivery_instructions: '',
  });

  const prevScrollPosRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = currentScrollPos < prevScrollPosRef.current;

      prevScrollPosRef.current = currentScrollPos;
      setVisible(isVisible);
    };

    setVisible(true);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function updateFields(fields: Partial<DogFormData>) {
    setDogData(prev => ({
      ...prev,
      ...fields,
    }));
  }

  function updateOrderFields(fields: Partial<OrderData>) {
    setOrderData(prev => ({
      ...prev,
      ...fields,
    }));
  }

  const setSignUpRedirect = (value: boolean) => {};

  return (
    <Container className="mb-4">
      <div id="App" className="App">
        <BrowserRouter>
          <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} visible={visible} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/SignUp"
              element={
                <SignUp
                  SignUpFormData={signUpFormData}
                  setSignUpRedirect={setSignUpRedirect}
                  isSignedIn={isSignedIn} // Make sure you provide this prop
                />
              }
            />
            <Route
              path="/SignIn"
              element={
                <SignIn
                  SignInFormData={signInFormData}
                  signUpRedirect={false}
                  isSignedIn={isSignedIn}
                  setIsSignedIn={setIsSignedIn}
                />
              }
            />
            <Route path="/Survey" element={<Survey updateFields={updateFields} updateOrderFields={updateOrderFields} />} />
            <Route path="/GetStarted" element={<GetStarted />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
