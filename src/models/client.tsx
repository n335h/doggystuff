import { createClient, SupabaseClient } from '@supabase/supabase-js';


export interface AddressData {
  // Define the properties of AddressData here
  address_fl: string;
  address_sl: string;
  address_town: string;
  address_county: string;
  address_postcode: string;
  user_id: string;
}

export interface OrderData {
  // Define the properties of OrderData here
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
}

export interface DogData {
  // Define the properties of DogData here
  dog_id: string;
  dog_name: string;
  dog_health: string;
  dog_size: string;
  dog_breed: string;
  dog_age: string;
  flavours_not: string[];
  veg: string;
}




// Assuming the environment variables are defined as string in your .env file.
const supabaseUrl: string | undefined = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey: string | undefined = process.env.REACT_APP_SUPABASE_KEY;

// Check if supabaseUrl and supabaseKey are defined before creating the client
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
}

// Functionality for signing in a user

export async function SignInUser(email: string, password: string): Promise<boolean> {
  try {
    const { error } = await supabaseClient?.auth.signInWithPassword({ email, password }) || {};
    if (error) {
      console.error('Sign-in error:', error);
      return false;
    } else {
      // Sign in was successful
      console.log('Sign-in successful');
      return true;
    }
  } catch (error) {
    // Handle any further errors that may occur
    console.error('Sign-in error:', error);
    return false;
  }
}

// Check if a user is signed in
export async function isSessionSignedIn(): Promise<boolean> {
  try {
    const { data, error } = await supabaseClient!.auth.getSession(); // ! is used to tell TypeScript that the value is not null
    if (error) {
      console.log(error);
      return false;
    } else {
      if (data.session) { //added .session to data to fix error "Property 'session' does not exist on type 'Session | null'." 
        // console.log("A user is logged in.", data);
        return true;
      } else {
        // console.log("A user is not logged in.", data);
        return false;
      }
    }
  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
    return false;
  }
}

// Get the currently signed-in user's id
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabaseClient!.auth.getUser();
    return user?.id || null; // ? is used to tell TypeScript that the value may be null or undefined and to not throw an error if it is 
  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
    return null;
  }
}

// Sign out the user
export async function signOut() {
  await supabaseClient!.auth.signOut();
}

export default supabaseClient;




export async function fetchUserProfile() {
  const user = await supabaseClient?.auth.getUser();



  if (user) {
    console.log(user?.data.user?.id, 'THIS IS THE USER ID 1 ');
    try {
      const { data: userData, error } = await supabaseClient!
        .from('users')
        .select('*')
        .eq('user_id', user?.data.user?.id) //added ? to user to fix error "Object is possibly 'null'."
        .single();

      console.log(userData, 'THIS IS THE USER DATA 2');

      // const { data: addressData, error } = await supabaseClient!
      //   .from('user_address')
      //   .select('*')
      //   .eq('user_id', user.data.user.id)
      //   .single();

      //   console.log(user.data.user.id, 'THIS IS THE USER ID being');

      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        const userProfile = { ...userData };
        console.log('User Profile:', userProfile, 'THIS IS THE USER PROFILE 3');
        return userProfile;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  } else {
    console.log('User is not signed in.');
  }
}

export async function fetchUserAddressData(): Promise<AddressData | null> {
  try {
    const user_ID = await getCurrentUserId();
    if (user_ID) {
      const address_query = await supabaseClient!
        .from('user_address')
        .select('*')
        .eq('user_id', user_ID)
        .single();

      if (address_query.error) {
        console.error('Error fetching user address data:', address_query.error);
        return null;
      } else {
        return {
          address_fl: address_query.data.address_fl,
          address_sl: address_query.data.address_sl,
          address_town: address_query.data.address_town,
          address_county: address_query.data.address_county,
          address_postcode: address_query.data.address_postcode,
          user_id: user_ID,
        };
      }
    } else {
      console.log('User is not signed in.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user address data:', error);
    return null;
  }
}

export async function fetchUserOrderData(): Promise<OrderData[]> {
  try {
    const user_ID = await getCurrentUserId();
    console.log(user_ID, 'THIS IS THE USER ID 14');
    if (user_ID) {
      const order_query = await supabaseClient!
        .from("order")
        .select('*')
        .eq('user_id', user_ID);

      console.log(order_query, 'THIS IS THE ORDER QUERY 2');
      if (order_query.error) {
        console.error('Error fetching user order data:', order_query.error);
        return []; // Return an empty array when there's an error.
      } else {
        return order_query.data; // Return the array of orders.
      }
    }

    // Return an empty array when user_ID is not available.
    return [];
  } catch (error) {
    console.error('An error occurred:', error);
    return []; // Return an empty array in case of an error.
  }
}
// export async function fetchUserAddressData() {
//   const user_ID = await getCurrentUserId();
//   //convert user_ID to string
//   console.log(user_ID, 'THIS IS THE USER ID 1 ');

//   if (user_ID) {
//     let address_query = await supabaseClient!
//       .from('user_address')
//       .select('*')
//       .eq('user_id', user_ID)
//       .single();

//     console.log(address_query, 'THIS IS THE ADDRESS QUERY 2');

//     if (address_query.error) {
//       console.error('Error fetching user address data:', address_query.error);
//     } else {
//       const userAddress = { ...address_query};
//       console.log('User Address:', userAddress, 'THIS IS THE USER ADDRESS 4');
//       return userAddress;
//     }
//   } else {
//     console.log('User is not signed in.');
//   }



// if (user) {
//   const { data: addressData, error } = await supabaseClient!
//     .from('user_address')
//     .select('*')
//     .eq('user_id',user_id)
//     .single();

//   if (error) {
//     console.error('Error fetching user address data:', error);
//   } else {
//     const userAddress = { ...addressData };
//     console.log('User Address:', userAddress, 'THIS IS THE USER ADDRESS 4');
//     return userAddress;
//   }
// } else {
//   console.log('User is not signed in.');
// }
// }



export async function fetchUserDogData(): Promise<DogData[]> {
  try {
    const user_ID = await getCurrentUserId();
    if (user_ID) {
      const dog_query = await supabaseClient!
        .from("dog")
        .select('*')
        .eq('user_id', user_ID)


      console.log(dog_query, 'THIS IS THE DOG QUERY 1');
      if (dog_query.error) {
        console.error('Error fetching user order data:', dog_query.error);
        return [];
      } else {
        return dog_query.data; // Return the array of dog data.
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching user order data:', error);
    return [];
  }
}


export async function fileUploadHandler(selectedFile: File | null) {
  if (!selectedFile) {
    throw new Error("Please select an image file.");
  }

  const formData = new FormData();
  formData.append("dog_image", selectedFile); // Assuming "dog_image" is the name of the column where you want to store the image.

  try {
    const user_ID = await getCurrentUserId(); // Make sure this function gets the current user's ID correctly.

    const { data, error } = await supabaseClient!
      .storage
      .from('dog-images')
      .update(`${user_ID}/${selectedFile.name}`, formData);

    if (!error) { // Check if there was no error during the update.
      console.log("Image uploaded successfully.");
      return true;
    } else {
      console.error("Image upload failed:", error.message);
      return false;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return false;
  }
}

export async function updateUserData(
  user_id: string,
  first_name: string,
  last_name: string,
  email: string,
): Promise<void> {
  try {
    console.log('Updating user data:', user_id, first_name, last_name, email);

    const { data, error } = await supabaseClient!.from('user').update({
      first_name: first_name,
      last_name: last_name,
      email: email,
    }).eq('user_id', user_id);

    if (error) {
      console.error('Error updating user data:', error);
      throw new Error(`Error updating user data: ${error.message}`);
    }

    console.log('Update UserData:', data);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // You can choose to rethrow the error for further handling or logging.
  }
}


export async function updateUserAddressData(
  address_fl: string,
  address_sl: string,
  address_town: string,
  address_county: string,
  address_postcode: string,
): Promise<void> {
  try {
    const user_ID = await getCurrentUserId();
    const { data, error } = await supabaseClient!.from('user_address').update({
      address_fl: address_fl,
      address_sl: address_sl,
      address_town: address_town,
      address_county: address_county,
      address_postcode: address_postcode,
    }).eq('user_id', user_ID);

    if (error) {
      throw new Error(`Error updating user address data: ${error.message}`);
    }

    console.log('Update UserAddressData');
  } catch (error) {
    console.error('Error updating user address data:', error);
    throw error; // You can choose to rethrow the error for further handling or logging.
  }
}


export async function updateDogData(
  dog_name: string,
  dog_health: string,
): Promise<void> {
  await supabaseClient!.from('dog').update({
    dog_name: dog_name,
    dog_health: dog_health,
  });
  console.log('Update DogData');
}









// type UserData = {
//   user: User | null;
//   session: Session | null;
// };
// type User = {
//  user_metadata: {
//   first_name: string;
//   last_name: string;
//  };
//  };

// type Session = {
//   // Define the properties of the Session type if needed.
// };