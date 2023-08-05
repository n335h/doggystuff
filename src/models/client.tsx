import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';

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
      if (data) {
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
