import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Survey from "../Survey/formPages/Survey"
import  DogFormData from "../Survey/formPages/Survey"
import SignInSignUp from '../SignInSignUp/SignInSignUp';
import SignUp, { SignUpFormData } from '../SignInSignUp/Components/SignUp/SignUp';
import Navbar from '../Navbar/Navbar';
import { Landing } from '../Landing/Landing';
import { Container } from 'react-bootstrap';


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
    dogName: string;
    dogAge: string;
    dogSex: string;
    dogBreed: string;
    pureCross: string;
    dogHealth: string;
    dogWeight: string;
  };

  const INITIAL_DATA: DogFormData = {
    dogName: "",
    dogAge: "",
    dogSex: "",
    dogBreed: "",
    pureCross: "",
    dogHealth: "",
    dogWeight: "",

}
const [dogData, setDogData] = useState<DogFormData>(INITIAL_DATA);

  function updateFields(fields: Partial<DogFormData>) {
    setDogData(prev => ({
      ...prev,
      ...fields
    }));
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
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
