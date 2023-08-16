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
            <div className="landingSub">
                <h2>How it works</h2>
                <div className="landingSubContent">
                    <div className="landingSubContentItem">
                        <h3>1. Tell us about your dog</h3>
                        <p>Fill out your dog's profile and tell us about their breed, age, weight, health and activity level.</p>

            </div>
            </div>
            </div>
        
            </Container>
        )
    }