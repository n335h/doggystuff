import supabaseClient from './client';

// Define the type of the formData object
interface FormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// type UserData = {
//   user: User | null;
//   session: Session | null;
// };

type User = {
  id: string;
  user_metadata: {
    first_name: string;
    last_name: string;
  };
};

type Session = {
  // Define the properties of the Session type if needed.
};

export async function insertPublicUser(
  user_id: string,
  first_name: string,
  last_name: string,
  email: string
): Promise<void> {
  await supabaseClient!.from('user').insert({
    user_id: user_id,
    first_name: first_name,
    last_name: last_name,
    email: email,
  });
}

// supabaseSignUp() - is used to sign up a user using the Supabase authentication service.
// It takes in a formData object containing user signup data.
// supabaseSignUp() - is used to sign up a user using the Supabase authentication service.
// It takes in a formData object containing user signup data.
export async function supabaseSignUp(formData: FormData): Promise<boolean> {
  try {
    if (!supabaseClient) {
      console.error('Supabase client is null.');
      return false;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email: formData.email,
      password: formData.password,
      // additional 'metadata' can be inserted into the auth.users table
      // using the 'options' property
      options: {
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        },
      },
    });

    if (error) {
      console.error('Sign-up error:', error);
      return false;
    } else {
      if (data?.user) {
        const user_id = data.user.id;
        const first_name = data.user.user_metadata?.first_name;
        const last_name = data.user.user_metadata?.last_name;
        const email = data.user.user_metadata?.email;

        // insertPublicUser() - is used to insert a new user into the public.users table.
        if (user_id && first_name && last_name) {
          await insertPublicUser(user_id, first_name, last_name, email);
        }
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
