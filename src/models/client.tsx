import { createClient, SupabaseClient } from '@supabase/supabase-js'

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
        const { data, error } = await supabaseClient?.auth.signInWithPassword({
            email: email,
            password: password,
        }) || {};
        if (error) {
            console.error('Sign-in error:', error);
            return false;
        }
        else {
            // Sign in was successful
            console.log('Sign-in successful');
            return true;
        }
    }
    catch (error) {
        // Handle any further errors that may occur
        console.error('Sign-in error:', error);
        return false;
}
}
export default supabaseClient;