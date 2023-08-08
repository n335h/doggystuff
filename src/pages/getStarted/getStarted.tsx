import React from 'react'
import { Link } from 'react-router-dom'
import './getStarted.css'



function GetStarted () {
    return (
        <div className='getStarted'>
        <div className='getStarted'>
            <h1>Welcome to DoggyStuff</h1>

            <p> We are a subscription service that delivers a box of goodies to your dog every month. </p>
            <p> We tailor the contents of the box to your dog's needs and preferences. </p>
            <p> To get started, please fill out the survey below. </p>








            <Link to='/Survey' className='getStartedButton'>Try doggyStuff</Link>
        </div>
        <div className='infoBox'>
            <img className='infoBoxImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png' alt='info' />
        <p>If you have <strong>more than one dog, you can always repeat the process</strong> once the first subscription is completed.</p>
            </div>
        </div>

    )
}

export default GetStarted