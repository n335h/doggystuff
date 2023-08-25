import React from 'react'
import './Profile.css'

function Profile () {


    return (
        <div>
          
    <div id="dashboard">
      <div className="userDetails">
        <h1 className="welcome-text">
          Welcome <span className="name-text"> </span>
        </h1>
        <p className="inner-text">
          <span className="bolded">Name:</span>  
        </p>
        <p className="inner-text">
          <span className="bolded">Email:</span> 
        </p>
        <p className="inner-text">
          <span className="bolded">Address:</span>  
        </p>
        <p className="inner-text">
          <span className="bolded">Phone:</span>
        </p>
       
      </div>

      <div className="user-image-container">
        <img
          className="user-image"
          src=" "
          alt="dogImg">
          </img>
      </div>
    </div>    

        </div>
    )
}

export default Profile