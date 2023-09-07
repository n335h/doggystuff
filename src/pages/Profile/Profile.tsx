import React, { useEffect, useState } from 'react';
import {
  fileUploadHandler,
  fetchUserProfile,
  fetchUserAddressData,
  fetchUserOrderData,
  fetchUserDogData,
  updateUserData,
  updateUserAddressData,
} from '../../models/client';
// import ImageUpload from '../ImgUpload/ImgUpload';
import './Profile.css';
import dogAvatar from '../../Assets/temp-dog-avatar.jpg';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
}

type AddressData = {
  address_fl: string;
  address_sl: string;
  address_town: string;
  address_county: string;
  address_postcode: string;
  user_id: string;
};

type OrderData = {
  order_id: string;
  created_at: string;
  total: string;
  veg: string;
  flavours_not: string[];
  user_id: string;
  days: string;
  address_fl: string;
  address_sl: string;
  address_town: string;
  address_county: string;
  address_postcode: string;
  dog_name: string;
};

type DogData = {
  dog_id: string;
  dog_name: string;
  dog_health: string;
  dog_size: string;
  dog_breed: string;
  dog_age: string;
  flavours_not: string[];
  veg: string;
  
};

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
}

function Profile() {
  const [userProfile, setUserProfile] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    user_id: '',
  });
  const [addressData, setAddressData] = useState<AddressData>({
    address_fl: '',
    address_sl: '',
    address_town: '',
    address_county: '',
    address_postcode: '',
    user_id: '',
  });
  const [orderData, setOrderData] = useState<OrderData>({
    order_id: '',
    created_at: '',
    total: '',
    veg: '',
    flavours_not: [],
    user_id: '',
    days: '',
    address_fl: '',
    address_sl: '',
    address_town: '',
    address_county: '',
    address_postcode: '',
    dog_name: '',
  });
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [dogData, setDogData] = useState<DogData>({
    dog_id: '',
    dog_name: '',
    dog_health: '',
    dog_size: '',
    dog_breed: '',
    dog_age: '',
    flavours_not: [],
    veg: '',


  });
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [showOrderOverlay, setShowOrderOverlay] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [showDogOverlay, setShowDogOverlay] = useState(false);
  const [selectedDog, setSelectedDog] = useState<DogData | null>(null);

  const [editProfile, setEditProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    user_id: '',
  });
  const [editAddress, setEditAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState<AddressData>({
    address_fl: '',
    address_sl: '',
    address_town: '',
    address_county: '',
    address_postcode: '',
    user_id: '',
  });

  const handleViewOrderClick = (order: OrderData) => {
    setSelectedOrder(order);
    setShowOrderOverlay(true);
  };

  const handleViewDog = (dog: DogData) => {
    setSelectedDog(dog);
    setShowDogOverlay(true);
  };


  useEffect(() => {
    async function getUserProfile() {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData);
      setEditedProfile(profileData);
    }

    getUserProfile();
  }, []);

  useEffect(() => {
    async function getUserAddressData() {
      const fetchedAddressData = await fetchUserAddressData();
      if (fetchedAddressData) {
        setAddressData(fetchedAddressData);
        setEditedAddress(fetchedAddressData);
      }
    }

    getUserAddressData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      await updateUserData(
        userProfile.user_id,
        editedProfile.first_name,
        editedProfile.last_name,
        editedProfile.email
      );
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
        editedAddress.address_postcode
      );
      setAddressData({ ...addressData, ...editedAddress });
      setEditAddress(false);
    } catch (error) {
      console.error("Error updating address data:", error);
    }
  };

  const fileSelectedHandler = (event: any) => { // links to non working image upload
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  const handleFileUpload = async () => { // links to non working image upload
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
    }

    getUserOrderData();
  }, []);

  useEffect(() => {
    async function getUserDogData() {
      const dogData = await fetchUserDogData();
      setDogData(dogData);
      setDogs(dogData);
    }

    getUserDogData();
  }, []);

  return (
    <div className="profile animate-pop-in">
<div className="maindashboard">
  <div className="dashboardleft">
    <div className="userDetails">
      <h2 className="welcome-text">
        Welcome <span className="name-text">{userProfile.first_name}</span>!
      </h2>
            <div className="userinfobox">
            {editProfile ? (
              /* Edit Mode */
              <div className="userinfobox">
                <input className='editinfo'
                title='firstName'
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
                  title='lastName'
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
                title='email'
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
                <input className='editinfo' title="address_fl" type="text" placeholder={addressData?.address_fl} 
                value={addressData?.address_fl}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_fl: e.target.value,
                  })
                }/>
                <input className='editinfo' 
               title='address_sl'
               type="text" placeholder={addressData?.address_sl}
                value={addressData?.address_sl}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_sl: e.target.value,
                  })
                }/>
                <input className='editinfo' 
                title='address_town'
                type="text" placeholder={addressData?.address_town}
                value={addressData?.address_town}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_town: e.target.value,
                  })
                }/>
                <input className='editinfo'
                title='address_county'
                type="text" placeholder={addressData?.address_county}
                value={addressData?.address_county}
                onChange={(e) =>
                  setEditedAddress({
                    ...editedAddress,
                    address_county: e.target.value,
                  })
                }/>
                <input className='editinfo' 
                title='address_postcode'
                type="text" placeholder={addressData?.address_postcode}
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
                // View Mode
                <div className="userinfobox">
              
                <section className="userinfo">
                <div className='userinfodetails'>
                <h3 className="userdetails">User Details</h3> 
                  
                <p>
                  <span className="bolded">Firstname: {userProfile?.first_name}</span>
                </p>
                <p>
                  <span className="bolded">Lastname: {userProfile?.last_name}</span>
                </p>
                <p>
                  <span className="bolded">Email: {userProfile?.email}</span>
                </p>
                </div>
                <div className='useraddressdetails'>
                <h3 className="address">Address</h3>
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
                </div>
               
               
                </section>
                <button onClick={() => setEditProfile(true)}>Edit</button>
                </div>
        )}
        
      </div>

    </div>
  </div>

        <div className="dashboardright">
        <div className="userpetbox">
  <h3 className="userpetbox">Doggos</h3>
  {dogs.map((dog) => (
    <div className="dogContainer" key={dog.dog_id}>
      <div className="dogimg">
        {dog.src ? (
          <img src={dog.src} alt="dog" />
        ) : (
          <img src={dogAvatar} alt="default dog" />
        )}
      </div>
      <div className="dog-details">
        <p>{dog.dog_name}</p>
        <p>{dog.dog_breed}</p>
        <p>{dog.dog_age} Years</p>
      </div>
      <div className="dog-button-container">
        <button onClick={() => handleViewDog(dog)}>View Dog</button>
      </div>
    </div>
  ))}
</div>
        
       
          <div className="userorderbox">
  <h3 className="Orders">Orders</h3>
  {orders.map((order) => (
    <div key={order.order_id} className="order-container">
      <div className="order-details">
        <div className="order-data">
          <p className="inner-text">
            <span className="bolded">Order ID: {order.order_id}</span>
          </p>
          <p className="inner-text">
            <span className="bolded">Order Date: {formatDate(order.created_at)}</span>
          </p>
        </div>
        <div className="order-button-container">
          <button onClick={() => handleViewOrderClick(order)} className="orderviewbutton">
            View Order
          </button>
        </div>
      </div>
      <hr className="linebreak" />
    </div>
  ))}
</div>
        </div>

        {/* Overlay to display selected order */}
        {showOrderOverlay && selectedOrder && (
                  <div className="order-overlay">
                  {/* Add your order details display here */}
                  <h3>Order Details</h3>
                  <p>Order ID: {selectedOrder.order_id}</p>
                  <p>Order Date: {formatDate(selectedOrder.created_at)}</p>
                  <p>Dog Name: {selectedOrder.dog_name}</p>
                  <p>Include Veg: {selectedOrder.veg}</p>
                  <p>Food {selectedOrder.dog_name} does not like: {selectedOrder.flavours_not}</p>
                  <p>Quantity: {selectedOrder.days} days</p>
                  <h3> Delivery Address</h3>
                  <p>{selectedOrder.address_fl}</p>
                  <p>{selectedOrder.address_sl}</p>
                  <p>{selectedOrder.address_town}</p>
                  <p>{selectedOrder.address_county}</p>
                  <p>{selectedOrder.address_postcode}</p>
                  <button onClick={() => setShowOrderOverlay(false)}>Close</button>
                </div>
              )}

        {/* Overlay to display selected dog */}
        {showDogOverlay && selectedDog && (
          <div className="dog-overlay">
             <h3>{selectedDog.dog_name}s Details</h3>
          <div className="dogimg">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="dog" />
            ) : selectedDog.src ? (
              <img src={selectedDog.src} alt="dog" />
            ) : (
              <img src={dogAvatar} alt="default dog" />
            )}
            <input title="uploadImg" type="file" onChange={fileSelectedHandler} />
            <button onClick={handleFileUpload}>Upload Image</button>
          </div>
          <p>Name: {selectedDog.dog_name}</p>
          <p>Breed: {selectedDog.dog_breed}</p>
          <p>Age: {selectedDog.dog_age}</p>
          <p>Health: {selectedDog.dog_health}</p>
          <p>Size: {selectedDog.dog_size}</p>
          <p>Food {selectedDog.dog_name} does not like: {selectedDog.flavours_not}</p>
          <p>Vegetarian: {selectedDog.veg}</p>


          <button onClick={() => setShowDogOverlay(false)}>Close</button>
        </div>
)}
      </div>
    </div>
      
  );
}

export default Profile;

