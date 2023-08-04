
import './App.css';
import React, { useState } from 'react';
import SignInSignUp from '../SignInSignUp/SignInSignUp';


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [filter, setFilter] = useState('');

  const signInSignUpProps = {
    isSignedIn: isSignedIn,
    setIsSignedIn: setIsSignedIn,
    setFilter: setFilter,
  };

  return (
    <div className="App">
     
     <SignInSignUp {...signInSignUpProps}/>

 <h1>hello this is the app</h1>


    </div>
  );
}

export default App;
