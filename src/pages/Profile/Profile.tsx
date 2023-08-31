import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchUserAddressData, fetchUserOrderData, fetchUserDogData} from '../../models/client';
import './Profile.css';
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

type orderData = {
  order_id: string;
  created_at: string;
  total: string;
  veg: string;
  flavours_not: string[];
  user_id: string;
  days: string;
};

type dogData = {
  dog_id: string;
  dog_name: string;
};

function formatDate(dateString: string) { // the formatDate function uses the toLocaleDateString method to format the date in a user-readable format
  const options = { year: 'numeric', month: 'long', day: 'numeric' }; // the options object is used to specify the format of the date
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options); // the toLocaleDateString method is used to format the date
  return formattedDate;
}

function Profile() {
  const [userProfile, setUserProfile] = useState<profileData | null>(null);
  const [addressData, setAddressData] = useState<addressData | null>(null);
  const [orderData, setOrderData] = useState<orderData | null>(null);
  const [orders, setOrders] = useState<orderData[]>([]); // Initialise the orders state as an empty array
  const [dogData, setdogData] = useState<dogData | null>(null);
  const [dogs, setDogs] = useState<dogData[]>([]); // Initialise the orders state as an empty array


  const [editProfile, setEditProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    email: userProfile?.email || '',
  });
  const [editAddress, setEditAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    address_fl: addressData?.address_fl || '',
    address_sl: addressData?.address_sl || '',
    address_town: addressData?.address_town || '',
    address_county: addressData?.address_county || '',
    address_postcode: addressData?.address_postcode || '',
  });
  const [editPets, setEditPets] = useState(false);
  const [editedPets, setEditedPets] = useState([...dogs]);
  //#endregion

  const handleSaveAddress = async () => {
    const updatedAddress = await fetchUserAddressData(editedAddress);
    setAddressData(updatedAddress);
    setEditAddress(false);
  };

  const handleSavePets = async () => {
    const updatedPets = await fetchUserDogData(editedPets);
    setdogData(updatedPets);
    setEditPets(false);
  };
  
  
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

  const handleSaveProfile = async () => {
    const updatedProfile = await fetchUserProfile(editedProfile);
    setUserProfile(updatedProfile);
    setEditProfile(false);
  };
  
  useEffect(() => {
    async function getUserOrderData() {
      const orderData = await fetchUserOrderData();
       setOrderData(orderData);
       setOrders(orderData);
       console.log(orderData, 'THIS IS THE USER Order DATA on PROFILE PAGE');
    } 
      
    getUserOrderData();
  }, []);

  useEffect(() => {
    async function getUserDogData() {
      const dogData = await fetchUserDogData();
       setdogData(dogData);
       setDogs(dogData);
       console.log(dogData, 'THIS IS THE USER DOG DATA on PROFILE PAGE');
    } 
      
    getUserDogData();
  }, []);


  return (
    <div>
      <div id="dashboard">
        <div className="userDetails">
          <h1 className="welcome-text">
            Welcome <span className="name-text">{userProfile?.first_name}</span>
          </h1>

          <div className="userinfobox">
            {editProfile ? (
              /* Edit Mode */
              <div className="userinfobox">
                <input
                  type="text"
                  value={userProfile?.first_name}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      first_name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder={userProfile?.last_name}
                  value={editedProfile.last_name}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      last_name: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder={userProfile?.email || 'Enter Email'}
                  value={userProfile?.email}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      email: e.target.value,
                    })
                  }
                />
                <input type="text" placeholder={addressData?.address_fl} 
                value={addressData?.address_fl}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_fl: e.target.value,
                  })
                }/>
                <input type="text" placeholder={addressData?.address_sl}
                value={addressData?.address_sl}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_sl: e.target.value,
                  })
                }/>
                <input type="text" placeholder={addressData?.address_town}
                value={addressData?.address_town}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_town: e.target.value,
                  })
                }/>
                <input type="text" placeholder={addressData?.address_county}
                value={addressData?.address_county}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_county: e.target.value,
                  })
                }/>
                <input type="text" placeholder={addressData?.address_postcode}
                value={addressData?.address_postcode}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_postcode: e.target.value,
                  })
                }/>



                <button onClick={handleSaveProfile}>Save</button>
                <button onClick={() => setEditProfile(false)}>Cancel</button>
              </div>
            ) : (
              /* Display Mode */
              <div className="userinfobox">
                <p>
                  <span className="bolded">Firstname: {userProfile?.first_name}</span>
                </p>
                <p>
                  <span className="bolded">Lastname: {userProfile?.last_name}</span>
                </p>
                <p>
                  <span className="bolded">Email: {userProfile?.email}</span>
                </p>
                <h2 className="address">Address</h2>
                <p>
                  <span className="bolded"> {addressData?.address_fl}</span>
                </p>
                <p>
                  <span className="bolded">{addressData?.address_sl}</span>
                </p>
                <p>
                  <span className="bolded"> {addressData?.address_town}</span>
                </p>
                <p>
                  <span className="bolded">{addressData?.address_county}</span>
                </p>
                <p>
                  <span className="bolded"> {addressData?.address_postcode}</span>
                </p>
                <button onClick={() => setEditProfile(true)}>Edit</button>
              </div>
            )}
          </div>
          <div className="userpetbox">
            {editPets ? (

              <div>
                {editedPets.map((dog, index) => (
                  <div key={index}>
                     <input
                      type="text"
                      value={dogData?.dog_name}
                      onChange={(e) =>
                        setEditedPets((prevPets) =>
                          prevPets.map((prevDog, dogIndex) =>
                            dogIndex === index
                              ? { ...prevDog, dog_name: e.target.value }
                              : prevDog
                          )
                        )
                      }
                      placeholder="Name"
                    />

                    <input 
                      type="text"
                      value={dog.dog_health}
                      onChange={(e) =>
                        setEditedPets((prevPets) =>
                          prevPets.map((prevDog, dogIndex) =>
                            dogIndex === index
                              ? { ...prevDog, dog_health: e.target.value }
                              : prevDog
                          )
                        )
                      }
                      placeholder="Breed"
                    />
                    
                  </div>
                ))}
                <button onClick={handleSavePets}>Save</button>
                <button onClick={() => setEditPets(false)}>Cancel</button>
              </div>
            ) : (
              /* Display Mode */
              <div>
                {dogs.map((dog) => (
                  <div className='dogContainer' key={dog.dog_id}>
                    <div className="dog-image-container">
                    <img src="https://images.unsplash.com/photo-1593642532452-9d5c0b2b1b5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwYmVlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="dogImg" />
                   </div>
                   <button className='uploadImg'>Upload Image</button>
                    <p> {dog.dog_name} </p>
                    <p> {dog.dog_breed} </p>
                    <p> {dog.dog_age} </p>
                    <p> {dog.dog_sex} </p>
                    <p> {dog.dog_health} </p>
                
                  </div>
                ))}
                <button onClick={() => setEditPets(true)}>Edit</button>
              </div>
            )}
          </div>

<div className="userorderbox">
  <h1 className="Orders"> Orders</h1>
  {orders.map(order => (
    <div key={order.order_id} className="order-details">
      <p className="inner-text">
        <span className="bolded">Order ID: {order.order_id}</span>
      </p>
      <p className="inner-text">
      <span className="bolded">Order Date: {formatDate(order.created_at)}</span>
      </p>
      {/* Display other order details */}
    </div>
  ))}
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

