import React from 'react';
import { Link } from 'react-router-dom';
import './getStarted.css'; // Update the import with your new CSS filename
import dogbark from '../../Assets/dogbark.svg';
import wave from '../../Assets/wave.svg';
import exclaim from '../../Assets/exclaim.svg';

function GetStarted() {
    return (
        <div className='get-started-outer'>
            <div className='get-started'>
                <h1 className='get-started-title animate-pop-in'>
                    Welcome to DoggyStuff <img className="exclaim-img" src={exclaim} alt="exclaim-img" />
                </h1>
                <img className='wave-img animate-pop-in' src={wave} alt='wave' />
                <p className='get-started-p animate-pop-in'>
                    We tailor the contents of the box to your dog's needs and preferences. To get started, we need to ask
                    you a few questions.
                </p>
                <Link to='/Survey' className='get-started-button animate-pop-in'>
                    Try DoggyStuff
                </Link>
            </div>
            <div className='background-float'>
                <img className='background-float-img animate-pop-in' src={dogbark} alt='dogbark' />
            </div>
            <div className='info-box animate-pop-in'>
                <img className='info-box-img' src='https://imgs.search.brave.com/x7lAN1Yh4ao1BYGf-xEAKQWv4PN6qhmDm-8y8J5gmzk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZG9vZGxlLTQv/MTU1L0luZm8tNjQu/cG5n' alt='info' />
                <p>If you have <strong>more than one dog, you can always repeat the process</strong> once the first subscription is completed.</p>
            </div>
        </div>
    );
}

export default GetStarted;
