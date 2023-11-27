import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";
import "../animate.css";
import landing1 from "../../Assets/landingsub2.png";
import lookinat from "../../Assets/lookinat.svg";
import keepscroll from "../../Assets/keepscroll.svg";
import stars from "../../Assets/stars.svg";



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
   <div className="landing-container">
      <div className="landing">
        <img className="keepscrollimg animate-pop-in" src={keepscroll} alt="keepscroll" />
    
        <div className="landing-main-Info ">
          <h2 className="main-sub  animate-pop-in">WHAT A GOOD DOGGO DESERVES</h2>
          <h1 className="main-para animate-pop-in">Tailored to their tastes. Delivered to your door. Try our trial box today for £9.99!</h1>
          <Link to="/GetStarted" className="landing-button animate-pop-in">Try DoggyStuff</Link>
        </div>
      </div>
      
      
      <section className="landing-section-1">
        <div className="landing-section-1-container" ref={landingSubRef}>

              <div className='landing-section-1-content'> 

                <div className='landing-section-1-info'>
                  <h2 className="landing-section-1-subs animate-pop-in">
                    The DoggyStuff Way
                    </h2>
                  <h1 className="landing-section-1-para ">
                    DoggyStuff makes food fit for a human’s plate and doggos palate. High-quality, high-protein ingredients. No sugars, salts, grains or fillers. Ever. 
                  </h1>
<Link to="/FAQ" className="landing-section-1-button animate-pop-in">Learn More</Link>
              <img src={stars} alt="bowl" className="starsimglanding animate-pop-in" /> 
                </div>

                <div className='landing-section-1-img-container'>
                  <img alt='containerImg ' className='landing-section-1-img animate-pop-in' src={landing1} />
                </div>
                
              </div>
            

             
          
        </div>
      </section>
      <section className="landing-section-2">

         <div className="landing-section-2-container">
         <img className="lookinat" src={lookinat} alt="lookinat" />
          </div>
      </section>



      <section className="landing-section-3">
        <div className="landing-section-3-container">
          <div className="landing-section-3-content"> 
            <div className="landing-section-3-info">
              <h1 className="landing-section-3-sub">Subscribe here, smart human</h1>
              <h2 className="landing-section-3-para">There's always alot happening in the world of doggo delights. Subscribe today to get all the latest from DoggyStuff.</h2>
              <div className="landing-section-3-input-container">
  <input type="text" placeholder="Enter your email address" />
  <button className="landingSub4Button">Submit</button>
</div>
             <span className="tcs"> <input className='tcsinput' title="t&cs" type="checkbox" />
              <label className="landingSub4Label">I agree to the <span className="tcslink"><a href=" "> 
              Terms and Conditions</a></span></label>
              </span>
              </div>
            
      
         
            </div>
          </div>
        
      </section>

    
    </div>
    
  );
}
