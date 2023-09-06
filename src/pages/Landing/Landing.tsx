import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";
//import animate.css from main pages folder
import "../animate.css";


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
   <div className="landingContainer">
      <div className="landing">
        <div className="landingContent"></div>
        
        <div className="landingInfo">
          <h2 className="landing-title  animate-pop-in">WHAT A GOOD DOGGO DESERVES</h2>
          <h1 className="landingPara animate-pop-in">Tailored to their tastes. Delivered to your door. Try our trial box today for £9.99!</h1>
          <Link to="/GetStarted" className="landingButton animate-pop-in">Try DoggyStuff</Link>
        </div>
      </div>
      
      
      <section className="landingSection">
        <div className="landingSubOuter" ref={landingSubRef}>
          {/* <div className="landingSubContent">
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
          </div> */}
        </div>
      </section>
      <section className="landingSection">
        <div className="landingSubOuter2">
          </div>
      </section>
      <section className="landingSection">
  <div className="landingSubOuter3">
    <div className="foodTypes">
      <div className="foodTypeContainer">
        <div className="foodType">
          <div className="foodTypeImage">
            <h2 className="foodTypeTitle">Food 1</h2>
            <img alt='foodTypeImg' className='foodTypeImg' src='image1.jpg' />
          </div>
        </div>
        <div className="foodType">
          <div className="foodTypeImage">
            <h2 className="foodTypeTitle">Food 2</h2>
            <img alt='foodTypeImg' className='foodTypeImg' src='image2.jpg' />
          </div>
        </div>
        <div className="foodType">
          <div className="foodTypeImage">
            <h2 className="foodTypeTitle">Food 3</h2>
            <img alt='foodTypeImg' className='foodTypeImg' src='image3.jpg' />
          </div>
        </div>
        <div className="foodType">
          <div className="foodTypeImage">
            <h2 className="foodTypeTitle">Food 3</h2>
            <img alt='foodTypeImg' className='foodTypeImg' src='image3.jpg' />
          </div>
        </div>
      </div>
    </div>
    <button className="foodTypeButton">View all products</button>
  </div>
</section>
      <section className="landingSection">
        <div className="landingSubOuter4">
          </div>
      </section>
    </div>
  );
}
