import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import "./Landing.css";

export function Landing() {
  const landingSubRef : any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const landingSub = landingSubRef.current;
      const scrollThreshold = landingSub.offsetTop + landingSub.offsetHeight / 2;

      if (window.scrollY >= scrollThreshold) {
        landingSub.scrollLeft += 5; // Adjust the scroll speed as needed
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container className='mb-4'>
      <div className="landing">
        <div className="landingContent"></div>
        
        <div className="landingInfo">
          <h2 className="landing-title">WHAT A GOOD DOGGO DESERVES</h2>
          <h1>Tailored to their tastes. Delivered to your door. Try our trial box today for £9.99!</h1>
          <Link to="/GetStarted" className="landingButton">Try DoggyStuff</Link>
        </div>
      </div>
      
      <section className="landingSection">
        <div className="landingSub" ref={landingSubRef}>
          <div className="landingSubContent">
            <h2>How it works</h2>
            <div className="landingSubContentItem">
              <div className='container'> 
                <div className='containerImage'>
                <img alt='containerImg' className='containerImg' src='https://images.pexels.com/photos/15794775/pexels-photo-15794775/free-photo-of-border-collie-dog-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>                </div>
                <div className='containerContent'>
                  <h3>Tell us about your dog</h3>
                  <p>Fill out your dog's profile and tell us about their breed, age, weight, health, and activity level.</p>
                
                </div>
              </div>
              <div className='container'> 
                <div className='containerImage'>
                  <img alt='containerImg' className='containerImg' src='your-image-url-here' />
                </div>
                <div className='containerContent'>
                  <h3>Tell us about your dog</h3>
                  <p>Fill out your dog's profile and tell us about their breed, age, weight, health, and activity level.</p>
                </div>
              </div>
              <div className='container'> 
                <div className='containerImage'>
                  <img alt='containerImg' className='containerImg' src='your-image-url-here' />
                </div>
                <div className='containerContent'>
                  <h3>Tell us about your dog</h3>
                  <p>Fill out your dog's profile and tell us about their breed, age, weight, health, and activity level.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
