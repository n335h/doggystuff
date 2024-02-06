// types.ts

export type SignInFormData = {
    email: string;
    password: string;
  };
  
  export type SignUpFormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
  
  export type DogFormData = {
    dog_name: string;
    dog_age: string;
    dog_sex: string;
    dog_breed: string;
    pure_cross: string;
    dog_health: string;
    dog_weight: string;
    dog_size: string;
    flavours_not: string[];
    veg: string;
  };
  
  export type OrderData = {
    days: string;
    address_fl: string;
    address_sl: string;
    address_town: string;
    address_county: string;
    address_postcode: string;
    delivery_instructions: string;
  };
  