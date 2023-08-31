import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
    const {  error } = await supabaseClient?.auth.signInWithPassword({ email, password }) || {};
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
    const { data:{user} } = await supabaseClient!.auth.getUser();
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
        const userProfile = {...userData} ;
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

export async function fetchUserAddressData(): Promise <addressData | null> {
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

export async function fetchUserOrderData(): Promise< orderData | null> {
  try {
    const user_ID = await getCurrentUserId();
    console.log(user_ID, 'THIS IS THE USER ID 14 ');
    if (user_ID) {
      const order_query = await supabaseClient!
        .from("order")
        .select('*') 
        .eq('user_id', user_ID)
       
console.log(order_query, 'THIS IS THE ORDER QUERY 2');
      if (order_query.error) {
        console.error('Error fetching user order data:', order_query.error);
        return null;
      } else {         
        console.log(order_query, 'THIS IS THE ORDER QUERY 2');

        return order_query.data;
        // return {
        //   order_id: order_query.data.order_id,
        //   created_at: order_query.data.created_at,
        //   total: order_query.data.total,
        //   veg: order_query.data.veg,
        //   flavours_not: order_query.data.flavours_not,
        //   user_id: user_ID,
        //   days: order_query.data.days,

        // };
      }
    } else {
      console.log('User is not signed in.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user order data:', error);
    return null;
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



export async function fetchUserDogData(): Promise< dogData | null> {
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
        return null;
      } else {         
        console.log(dog_query, 'THIS IS THE DOG QUERY 2');
        return dog_query.data;
        // return {
        //   order_id: order_query.data.order_id,
        //   created_at: order_query.data.created_at,
        //   total: order_query.data.total,
        //   veg: order_query.data.veg,
        //   flavours_not: order_query.data.flavours_not,
        //   user_id: user_ID,
        //   days: order_query.data.days,

        // };
      }
    } else {
      console.log('User is not signed in.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user order data:', error);
    return null;
  }

  
}