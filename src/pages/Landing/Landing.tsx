    import { Link } from 'react-router-dom';
    import "./Landing.css";
    //import { Link } from "react-router-dom";


    import { Container } from "react-bootstrap";

    export function Landing () {
        return (
            <Container className='mb-4'>
            <div className="landing">
                <div className="landingContent">
        
            </div>
            {/* <div className="landingImage">
                <img src={dog} alt="dog" />
            </div> */}
            <div className="landingInfo">
    <h2 className="landing-title">WHAT A GOOD DOGGO DESERVES</h2>
    <h1> Tailored to their tastes. Delivered to your door.  Try our trial box today for £9.99! </h1>
    <Link to="/GetStarted" className="landingButton">Try DoggyStuff</Link>
    {/* <a href='/Survey' className="landingButton">Try DoggyStuff</a> */}
            </div>
            </div>
            <section className="landingSection">
            <div className="landingSub">
<br></br>
                
                <div className="landingSubContent">
                <h2>How it works</h2>
                    <div className="landingSubContentItem">
                        <div className='container'> 
                        <div className='containerImage'>
                        <img  alt='containerImg' className='containerImg' src='https://images.pexels.com/photos/15794775/pexels-photo-15794775/free-photo-of-border-collie-dog-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                        </div>
                        <div className='containerContent'>
                        <h3>Tell us about your dog</h3>
                        <p>Fill out your dog's profile and tell us about their breed, age, weight, health and activity level.</p>
                        </div>
                        </div>
                        <div className='container'> 
                        <div className='containerImage'>
                        <img alt='containerImg' className='containerImg' src='https://images.pexels.com/photos/15794775/pexels-photo-15794775/free-photo-of-border-collie-dog-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                        </div>
                        <div className='containerContent'>
                        <h3>Tell us about your dog</h3>
                        <p>Fill out your dog's profile and tell us about their breed, age, weight, health and activity level.</p>
                        </div>
                        </div>
                        <div className='container'> 
                        <div className='containerImage'>
                        <img alt='containerImg'  className='containerImg' src='https://images.pexels.com/photos/15794775/pexels-photo-15794775/free-photo-of-border-collie-dog-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                        </div>
                        <div className='containerContent'>
                        <h3>Tell us about your dog</h3>
                        <p>Fill out your dog's profile and tell us about their breed, age, weight, health and activity level.</p>
                        </div>
                        </div>
                        <div className='container'> 
                        <div className='containerImage'>
                        <img  alt='containerImg' className='containerImg' src='https://images.pexels.com/photos/15794775/pexels-photo-15794775/free-photo-of-border-collie-dog-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                        </div>
                        <div className='containerContent'>
                        <h3>Tell us about your dog</h3>
                        <p>Fill out your dog's profile and tell us about their breed, age, weight, health and activity level.</p>
                        </div>
                        </div>
                        <div className='container'> 
                        <div className='containerImage'>
                        <img alt='containerImg'  className='containerImg' src='https://images.pexels.com/photos/15794775/pexels-photo-15794775/free-photo-of-border-collie-dog-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                        </div>
                        <div className='containerContent'>
                        <h3>Tell us about your dog</h3>
                        <p>Fill out your dog's profile and tell us about their breed, age, weight, health and activity level.</p>
                        </div>
                        </div>
                     
                    </div>
                    
                        
                </div>
            </div>
      
            </section>
        
            </Container>
        )
    }