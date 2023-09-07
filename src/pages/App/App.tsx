  import React, { useState, useEffect, useRef } from 'react';
  import { Routes, Route, BrowserRouter } from 'react-router-dom';
  import Survey from "../Survey/formPages/Survey"
  // import SignInSignUp from '../SignInSignUp/SignInSignUp';
  import SignUp from '../SignInSignUp/Components/SignUp/SignUp';
  import SignIn from '../SignInSignUp/Components/SignIn/SignIn';

  import Navbar from '../Navbar/Navbar';
  import { Landing } from '../Landing/Landing';
  import { Container } from 'react-bootstrap';
  import GetStarted from '../getStarted/getStarted';
  import Profile from '../Profile/Profile';
  import FAQ from '../FAQ/FAQ';



  function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [visible, setVisible] = useState(true);

    type SignInFormData = {
      email: string;
      password: string;
    };
    const initialSignInFormData: SignInFormData = {
      email: '',
      password: '',
    };
    const [signInFormData] = useState<SignInFormData>(initialSignInFormData);


    type SignUpFormData = {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    };
    
    // Define the initial form data for sign up
    const initialSignUpFormData: SignUpFormData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };

    const [data, setData] = useState<SignUpFormData>(initialSignUpFormData);
    console.log(setData)
    console.log(data)


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
      dog_size: string;
      flavours_not: string[];
      veg: string;
  
  }

  const INITIAL_DATA: DogFormData = {
      dog_name: "",
      dog_age: "",
      dog_sex: "",
      dog_breed: "",
      pure_cross: "",
      dog_health: "",
      dog_weight: "",
      dog_size: "",
      flavours_not: [],
      veg: "",
  
  }
  type OrderData = {
    days: string;
    address_fl: string;
    address_sl: string;
    address_town: string;
    address_county: string;
    address_postcode: string;
    delivery_instructions: string;
  }

  const INITIAL_ORDER_DATA: OrderData = {
    days: "",
    address_fl: "",
    address_sl: "",
    address_town: "",
    address_county: "",
    address_postcode: "",
    delivery_instructions: "",
  }
  const [dogData, setDogData] = useState<DogFormData>(INITIAL_DATA);
    const [orderData, setOrderData] = useState<OrderData>(INITIAL_ORDER_DATA);
    const [formData] = useState({
      first_name: '',
        last_name: '',
      password: '',
      email: '', });

      console.log(dogData,orderData)
    

    function updateFields(fields: Partial<DogFormData>) {
      setDogData(prev => ({
        ...prev,
        ...fields
      }));
    }

    function updateOrderFields(fields: Partial<OrderData>) {
      setOrderData(prev => ({
        ...prev,
        ...fields
      }));
    }



  const setSignUpRedirect = (value: boolean) => {};

  return (
    <Container className='mb-4'>
      <div id='App' className='App'>
        <BrowserRouter>
       
          <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} visible={visible} />
          <Routes>
            <Route path='/' element={<Landing />} />
            {/* <Route path='/src/pages/signsignup' element={<SignInSignUp isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} /> */}
            <Route
              path='/SignUp'
              element={ <SignUp
                SignUpFormData={formData}
        
                setSignUpRedirect={setSignUpRedirect}
                isSignedIn={isSignedIn} // Make sure you provide this prop
              />   }
            />
            <Route path='/SignIn' element={<SignIn
              SignInFormData={signInFormData}
 
              signUpRedirect={false}
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
            />} />
              <Route path='/Survey' element={<Survey updateFields={updateFields} updateOrderFields={updateOrderFields} />} />
                        <Route path='/GetStarted' element={<GetStarted />} />
                        <Route path='/profile'  element={<Profile />} />  
                        <Route path='/FAQ' element={<FAQ  />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    </Container>
  );
  }

  export default App;