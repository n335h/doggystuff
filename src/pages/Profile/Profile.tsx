import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchUserAddressData } from '../../models/client';

interface profileData {
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
}

type addressData = {
  address_fl: string;
  address_sl: string;
  address_town: string;
  address_county: string;
  address_postcode: string;
  user_id: string;
};

function Profile() {
  const [userProfile, setUserProfile] = useState<profileData | null>(null);
  const [addressData, setAddressData] = useState<addressData | null>(null);

  
  useEffect(() => {
    async function getUserProfile() {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData); /// need to rework so it isnt replacing the whole object with the new one with limited info
      console.log(userProfile, 'THIS IS THE USER PROFILE on PROFILE PAGE');
    }
  
    getUserProfile();
  }, []);

  useEffect(() => {
    async function getUserAddressData() {
      const addressData = await fetchUserAddressData();
       setAddressData(addressData);
       console.log(addressData, 'THIS IS THE USER ADDRESS DATA on PROFILE PAGE');
    }
      
    getUserAddressData();
  }, []);


  return (
    <div>
      <div id="dashboard">
        <div className="userDetails">
          <h1 className="welcome-text">
            Welcome <span className="name-text">{userProfile?.first_name}</span>
          </h1>

          <div className="userinfobox">
            <p className="inner-text">
              <span className="bolded">Firstname: {userProfile?.first_name}</span>
            </p>
            <p className="inner-text">
              <span className="bolded">Lastname: {userProfile?.last_name}</span>
            </p>
            
          <p className="inner-text">
            <span className="bolded">Email: {userProfile?.email}</span>
          </p>
          <p className="inner-text"><span className="bolded">{addressData?.address_fl}</span>
          </p>
          <p className="inner-text">
          <span className="bolded">{addressData?.address_sl}</span>
          </p>
          <p className="inner-text">
          <span className="bolded">{addressData?.address_town}</span>
          </p>
          <p className="inner-text">
          <span className="bolded"> {addressData?.address_county}</span>
          </p>
          <p className="inner-text">
          <span className="bolded">{addressData?.address_postcode}</span>
          </p>
          
</div>

        </div>
        <div className="user-image-container">
          <img
            className="user-image"
            src="your-image-url-here"
            alt="dogImg"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

