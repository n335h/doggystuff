import { createClient, SupabaseClient } from '@supabase/supabase-js';


export type ProfileData = {
  first_name: string;
  last_name: string;
  email: string;
  user_id: string;
}

export interface AddressData {
  address_fl: string;
  address_sl: string;
  address_town: string;
  address_county: string;
  address_postcode: string;
  user_id: string;
}

export interface OrderData {
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
  dog_id: string;
  dog_name: string;
  dog_health: string;
  dog_size: string;
  dog_breed: string;
  dog_age: string;
  flavours_not: string[];
  veg: string;
  src: string;
  user_id: string;

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
    console.log (user?.id, 'THIS IS THE USER ID')
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
    try {
      const { data: userData, error } = await supabaseClient!
        .from('users')
        .select('*')
        .eq('user_id', user?.data.user?.id) //added ? to user to fix error "Object is possibly 'null'."
        .single();


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

export async function fetchUserOrderData(): Promise<OrderData[] | null> {

  try {
    const user_ID = await getCurrentUserId();
    if (user_ID) {
      const order_query = await supabaseClient!
        .from("order")

        .select('*') 
        .eq('user_id', user_ID);
       

      if (order_query.error) {
        console.error('Error fetching user order data:', order_query.error);
        return null;
      } else {
        return order_query.data.map((order: any) => ({
          order_id: order.order_id,
          created_at: order.created_at,
          total: order.total,
          veg: order.veg,
          flavours_not: order.flavours_not,
          user_id: order.user_id,
          days: order.days,
          address_fl: order.address_fl,
          address_sl: order.address_sl,
          address_town: order.address_town,
          address_county: order.address_county,
          address_postcode: order.address_postcode,
          dog_name: order.dog_name,
        })) as OrderData[];

      }
    }

    // Return an empty array when user_ID is not available.
    return [];
  } catch (error) {
    console.error('An error occurred:', error);
    return []; // Return an empty array in case of an error.
  }
}



export async function fetchUserDogData(): Promise<DogData[] | null> {

  try {
    const user_ID = await getCurrentUserId();
    if (user_ID) {
      const dog_query = await supabaseClient!
        .from("dog")
        .select('*') 
        .eq('user_id', user_ID);
        
      if (dog_query.error) {
        console.error('Error fetching user order data:', dog_query.error);
        return null;
      } else {         
        return dog_query.data.map((dog: any) => ({
          dog_id: dog.dog_id,
          dog_name: dog.dog_name,
          dog_health: dog.dog_health,
          dog_size: dog.dog_size,
          dog_breed: dog.dog_breed,
          dog_age: dog.dog_age,
          flavours_not: dog.flavours_not,
          veg: dog.veg,
          user_id: dog.user_id,
        })) as DogData[];
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


    // Construct the path to the existing file with the same user ID
    const filePath = `user-${user_ID}-dog-image`; // Replace with your desired file name

    // Remove the existing file with the specified path
    const { error: deleteError } = await supabaseClient!
      .storage
      .from('dog-images')
      .remove([filePath]); // Pass the file path as an array

    if (deleteError) {
      console.error("Error deleting existing image:", deleteError.message);
      return false;
    }

    // Upload the new file with updated metadata
    const {error: uploadError } = await supabaseClient!
      .storage
      .from('dog-images')
      .upload(filePath, formData); // Use the same file path for the upload

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return false;
    }

    console.log("Image uploaded successfully.");
    return true;
  } catch (error) {
    console.error("Error uploading image:", error

    );
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

    const { data, error } = await supabaseClient!.from('users').update({
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
    const { error } = await supabaseClient!.from('user_address').update({
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
  console.log('Updated DogData');
}