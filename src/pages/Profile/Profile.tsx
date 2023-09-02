import React, { useEffect, useState } from 'react';
import { fileUploadHandler, fetchUserProfile, fetchUserAddressData, fetchUserOrderData, fetchUserDogData, updateUserData, updateUserAddressData, updateDogData } from '../../models/client';
import ImageUpload from '../ImgUpload/ImgUpload';
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
  dog_health: string;
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
  const [selectedFile, setSelectedFile] = useState(null);

  const [editProfile, setEditProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<profileData>({
    first_name: userProfile?.first_name || '',
    last_name: userProfile?.last_name || '',
    email: userProfile?.email || '',
    user_id: userProfile?.user_id || '', // Make sure to include user_id
  });
  const [editAddress, setEditAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState<addressData>({
    address_fl: addressData?.address_fl || '',
    address_sl: addressData?.address_sl || '',
    address_town: addressData?.address_town || '',
    address_county: addressData?.address_county || '',
    address_postcode: addressData?.address_postcode || '',
    user_id: userProfile?.user_id || '', // Set user_id to a valid value
  });
  const [editPets, setEditPets] = useState(false);
  const [editedPets, setEditedPets] = useState([...dogs]);
  //#endregion


  
  useEffect(() => {
    async function getUserProfile() {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData);
      setEditedProfile(profileData); // Set editedProfile to the current user data
      console.log(profileData, 'THIS IS THE USER PROFILE on PROFILE PAGE');
    }
  
    getUserProfile();
  }, []);
  

  useEffect(() => {
    async function getUserAddressData() {
      const fetchedAddressData = await fetchUserAddressData();
      if (fetchedAddressData) {
        setAddressData(fetchedAddressData);
        setEditedAddress(fetchedAddressData); // Set editedAddress to the current address data
        console.log(fetchedAddressData, 'THIS IS THE USER ADDRESS DATA on PROFILE PAGE');
      }
    }
  
    getUserAddressData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      await updateUserData(userProfile?.user_id || '', editedProfile.first_name, editedProfile.last_name, editedProfile.email);
      setUserProfile({ ...userProfile, ...editedProfile });
      setEditProfile(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleSaveAddress = async () => {
    try {
      await updateUserAddressData(
        editedAddress.address_fl,
        editedAddress.address_sl,
        editedAddress.address_town,
        editedAddress.address_county,
        editedAddress.address_postcode,
      );
      setAddressData({ ...addressData, ...editedAddress });
      setEditAddress(false);
    } catch (error) {
      console.error("Error updating address data:", error);
    }
  };
  const handleSavePets = async () => {
    try {
      // Assuming you have a list of edited pets, you can loop through them and update each one individually
      for (const editedPet of editedPets) {
        await updateDogData(
          editedPet.dog_name,
          editedPet.dog_health,
        );
      }
      setdogData([...editedPets]);
      setEditPets(false);
    } catch (error) {
      console.error("Error updating dog data:", error);
    }
  };
  




  const fileSelectedHandler = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    const success = await fileUploadHandler(selectedFile);
    if (success) {
      console.log('File uploaded successfully');
    } else {
      console.log('File upload failed');
    }
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
    <div className='profile'>

      <div className="maindashboard">
        
        <div className="dashboardleft">
       
          <div className="userDetails">
          <h1 className="welcome-text">
            Welcome <span className="name-text">{userProfile?.first_name}</span>!
          </h1>
     

          <div className="userinfobox">
          
            {editProfile ? (
              /* Edit Mode */
              <div className="userinfobox">
                <input className='editinfo'
                  type="text"
                  value={userProfile?.first_name}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      first_name: e.target.value,
                    })
                  }
                />
                <input className='editinfo'
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
                <input className='editinfo'
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
                <input className='editinfo' type="text" placeholder={addressData?.address_fl} 
                value={addressData?.address_fl}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_fl: e.target.value,
                  })
                }/>
                <input className='editinfo' type="text" placeholder={addressData?.address_sl}
                value={addressData?.address_sl}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_sl: e.target.value,
                  })
                }/>
                <input className='editinfo' type="text" placeholder={addressData?.address_town}
                value={addressData?.address_town}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_town: e.target.value,
                  })
                }/>
                <input className='editinfo' type="text" placeholder={addressData?.address_county}
                value={addressData?.address_county}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_county: e.target.value,
                  })
                }/>
                <input className='editinfo' type="text" placeholder={addressData?.address_postcode}
                value={addressData?.address_postcode}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_postcode: e.target.value,
                  })
                }/>

                <div className='editButtons'>
                <button onClick={() => setEditProfile(false)}>Cancel</button>
                <button onClick={handleSaveProfile}>Save</button>
                </div>
               
              </div>
            ) : (
              /* Display Mode */
              <div className="userinfobox">
                <h2 className="userdetails">User Details</h2> 
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
        </div>
        </div>
        <div className="dashboardright">
          
          <div className="userpetbox">
            <h2 className="userpetbox"> Doggos</h2>
          
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
              <div className='dogDisplay'>
                {dogs.map((dog) => (
                 
                  <div className='dogContainer' key={dog.dog_id}>
                      
                   <div className="dog-details">
                    <p> {dog.dog_name} </p>
                    <p> {dog.dog_breed} </p>
                    <p> {dog.dog_age} </p>
                    <p> {dog.dog_sex} </p>
                    <p> {dog.dog_health} </p>
                    <button onClick={() => setEditPets(true)}>Edit</button>
                    </div>
                    <div className="dog-image-container">
                      <ImageUpload
                      selectedFile={selectedFile}
                      fileSelectedHandler={fileSelectedHandler}
                      fileUploadHandler={fileUploadHandler}
                    />
                   </div>
                  </div>
                ))}
         
                </div>
                )}
                </div>

            <div className="userorderbox">
              <h2 className="Orders"> Orders</h2>
              {orders.map(order => (
                <div key={order.order_id} className="order-details">
                  <p className="inner-text">
                    <span className="bolded">Order ID: {order.order_id}</span>
                  </p>
                  <p className="inner-text">
                  <span className="bolded">Order Date: {formatDate(order.created_at)} </span>
                  </p>
                 <button className='orderviewbutton'>View Order</button>
                </div>
              ))}
            </div>
            </div>
      </div>
      </div>
   
  );
}

export default Profile;

