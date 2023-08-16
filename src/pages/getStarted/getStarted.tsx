    import React from 'react'
    import { Link } from 'react-router-dom'
    import './getStarted.css'
    import dogbark from '../../Assets/dogbark.svg'



    function GetStarted () {
        return (
            <div className='getStarted'>
            <div className='getStarted'>
                <h1>Welcome to DoggyStuff</h1>

                <p className='getStartedP'> We are a subscription service that delivers a box of goodies to your dog every month. </p>
                <p  className='getStartedP'> We tailor the contents of the box to your dog's needs and preferences. </p>
                <p  className='getStartedP'> To get started, please fill out the survey below. </p>








                <Link to='/Survey' className='getStartedButton'>Try doggyStuff</Link>
            </div>
            <div className='bkgrndFloat'>
    <img className='bkgrndFloatImg' src={dogbark} alt='dogbark'/>

            </div>
            <div className='infoBox'>
                <img className='infoBoxImg' src='https://imgs.search.brave.com/x7lAN1Yh4ao1BYGf-xEAKQWv4PN6qhmDm-8y8J5gmzk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZG9vZGxlLTQv/MTU1L0luZm8tNjQu/cG5n' alt='info' />
            <p>If you have <strong>more than one dog, you can always repeat the process</strong> once the first subscription is completed.</p>
                </div>
            </div>

        )
    }

    export default GetStarted