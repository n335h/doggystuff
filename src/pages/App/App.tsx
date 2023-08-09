import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Survey from "../Survey/formPages/Survey"
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import SignUp, { SignUpFormData } from '../SignInSignUp/Components/SignUp/SignUp';
import Navbar from '../Navbar/Navbar';
import { Landing } from '../Landing/Landing';
import { Container } from 'react-bootstrap';
import GetStarted from '../getStarted/getStarted';


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [visible, setVisible] = useState(true);
  
  // Define the initial form data for sign up
  const initialFormData: SignUpFormData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const [data, setData] = useState<SignUpFormData>(initialFormData);
  console.log(setData)


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

  type DogFormData = {
    dog_name: string;
    dog_age: string;
    dog_sex: string;
    dog_breed: string;
    pure_cross: string;
    dog_health: string;
    dog_weight: string;
 
}

const INITIAL_DATA: DogFormData = {
    dog_name: "",
    dog_age: "",
    dog_sex: "",
    dog_breed: "",
    pure_cross: "",
    dog_health: "",
    dog_weight: "",
 
}
const [dogData, setDogData] = useState<DogFormData>(INITIAL_DATA);

  function updateFields(fields: Partial<DogFormData>) {
    setDogData(prev => ({
      ...prev,
      ...fields
    }));
    console.log(dogData)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const setSignUpRedirect = (value: boolean) => {};

  return (
    <Container className='mb-4'>
      <div className="App">
        <BrowserRouter>
          <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} visible={visible} />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/src/pages/signsignup" element={<SignInSignUp isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
            <Route
              path="/SignUp"
              element={<SignUp formData={data} handleChange={handleChange} setSignUpRedirect={setSignUpRedirect} />}
            />
            <Route path="/Survey" element={<Survey updateFields={updateFields} />} />
            <Route path="/GetStarted" element={<GetStarted />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
