import "./Landing.css";
import dog from "../../Assets/home.png";
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
<h2 className="landing-title">Doggystuff</h2>
<h1> Tailored to their tastes. Delivered to your door.  Try our trial box today for £9.99! </h1>
<button className="landingButton">Get Started</button>
        </div>
    
        </div>
        </Container>
    )
}