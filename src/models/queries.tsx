import supabaseClient from './client';

// Define the type of the formData object
interface FormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}


export async function insertPublicUser(
  user_id: string,
  first_name: string,
  last_name: string,
  email: string
): Promise<void> {
  await supabaseClient!
  .from('users')
  .insert({
    user_id: user_id,
    first_name: first_name,
    last_name: last_name,
    email: email,
  });
}


// supabaseSignUp() - is used to sign up a user using the Supabase authentication service.
// It takes in a formData object containing user signup data.

export async function supabaseSignUp(formData: FormData): Promise<boolean> {
  try {
    if (!supabaseClient) {
      console.error('Supabase client is null.');
      console.log('supabase client is null');
     
      return false;
    }
    console.log(formData)
    console.log ('Supabase Connection')
    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
      // additional 'metadata' can be inserted into the auth.user table
      // using the 'options' property
      options: {
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
      },
    });

    if (error) {
      console.error('Sign-up error:', error);
      console.log('sign up error');
      console.log(formData);
      return false;
    } else {
      if (data?.user) {
        let user_id = data.user.id;
        let first_name = data.user.user_metadata?.first_name;
        let last_name = data.user.user_metadata?.last_name;
        let email = data.user.user_metadata?.email;
        insertPublicUser(user_id, first_name, last_name, email);
        console.log('insert public user');

        // // insertPublicUser() - is used to insert a new user into the public.user table.
        // if (user_id && first_name && last_name) {
        //   await insertPublicUser(user_id, first_name, last_name, email);
        // }
        // insertPublicUser() - is used to insert a new user into the public.user table.
      }
      return true;
    }
  } catch (error) {
    // Handle any further errors that may occur
    console.error('Sign-up error:', error);
    return false;
  }
}

export default supabaseClient;


