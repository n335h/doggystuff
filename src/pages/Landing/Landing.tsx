import React, { useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";
//import animate.css from main pages folder
import "../animate.css";
import landing1 from "../../Assets/landingsub2.png";
import lookinat from "../../Assets/lookinat.svg";
import keepscroll from "../../Assets/keepscroll.svg";
import bowl from "../../Assets/bowl.svg";
import arrows from "../../Assets/arrows.svg";

// import Footer from "../Footer/Footer";


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
        <img className="keepscrollimg animate-pop-in" src={keepscroll} alt="keepscroll" />
    
        <div className="landingInfo">
          <h2 className="landingsubs  animate-pop-in">WHAT A GOOD DOGGO DESERVES</h2>
          <h1 className="landingPara animate-pop-in">Tailored to their tastes. Delivered to your door. Try our trial box today for £9.99!</h1>
          <Link to="/GetStarted" className="landingButton animate-pop-in">Try DoggyStuff</Link>
        </div>
      </div>
      
      
      <section className="landingSection">
        <div className="landingSubOuter" ref={landingSubRef}>
           <div className="landingSubContent">
      
              <div className='landingsection2container'> 
                
                <div className='landingInfo2'>
                  <h2 className="landingsubs animate-pop-in">The DoggyStuff Way</h2>
                  <h1 className="landingPara animate-pop-in ">DoggyStuff makes food fit for a human’s plate and doggos palate. High-quality, high-protein ingredients. No sugars, salts, grains or fillers. Ever. 
</h1>
<Link to="/FAQ" className="landingSubButton animate-pop-in">Learn More</Link>

                </div>
                <div className='containerImage'>
     
                <img alt='containerImg ' className='containerImg animate-pop-in' src={landing1} />
                
                </div>
                
              </div>
            
          <img src={bowl} alt="bowl" className="bowlimg animate-pop-in" /> 

             
            </div>
          
        </div>
      </section>
      <section className="landingSection2">

         <div className="landingSubOuter2">
     <img className="lookinat" src={lookinat} alt="lookinat" />
          </div>
      </section>


{/* 
      <section className="landingSection3">
  <div className="landingSubOuter3">
    <div className="foodTypes">
      <div className="foodTypeContainer">
       
        
        
      </div>
    </div>
    <button className="foodTypeButton">View all products</button>
  </div> 
</section> */}
      <section className="landingSection4">
        <div className="landingSubOuter4">
          <div className="landingSub4Content">
            <div className="landingSub4Info">
              <img src={arrows} alt="arrow" className="arrowimg" />
              <h1 className="landingSub4Title">Subscribe here, smart human</h1>
              <h2 className="landingSub4Para">There's always alot happening in the world of doggo delights. Subscribe today to get all the latest from DoggyStuff.</h2>
              <div className="input-container">
  <input type="text" placeholder="Enter your email address" />
  <button className="landingSub4Button">Submit</button>
</div>
             <span className="tcs"> <input className='tcsinput' title="t&cs" type="checkbox" />
              <label className="landingSub4Label">I agree to the <span className="tcslink"><a href="https://www.termsandconditionsgenerator.com/live.php?token=9Z6Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z"> 
              Terms and Conditions</a></span></label>
              </span>
              </div>
            
      
         
            </div>
          </div>
        
      </section>
      {/* <Footer/> */}
    
    </div>
    
  );
}
