
import { useMultistepForm } from "../useMultistepForm"
import { DogBreed } from "./dogBreed"
import { DogHealth } from "./dogHealth"
import  DogFood  from "./dogFood"
import { useState } from "react"
import  DogInfo  from "./dogInfo"
import { FormEvent } from "react"
import supabase from "../../../models/client"
import { isSessionSignedIn } from "../../../models/client"
import { getCurrentUserId } from "../../../models/client"
import Confirmation from "./confirmation"

import "./Survey.css"
import OrderDetails from "./OrderDetails"
// import supabase from "../config/supabaseClient"

type DogFormData = {
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
    user_id: string,
 
}

const INITIAL_DATA: DogFormData = {
    dog_name: "",
    dog_age: "",
    dog_sex: "",
    dog_breed: "",
    pure_cross: "",
    dog_health: "",
    dog_weight: "",
    dog_size: "",
    flavours_not: [],
    veg: "",
    user_id: "",
 
}

type OrderData = {
    dog_name: string;
    days: string;
    address_fl: string;
    address_sl: string;
    address_town: string;
    address_county: string;
    address_postcode: string;
    delivery_instructions: string;
    dog_health: string;
    dog_weight: string;
    dog_size: string;
    flavours_not: string[];
    veg: string;
    user_id: string,
}
  
  const INITIAL_ORDER_DATA: OrderData = {
    days: "",
    address_fl: "",
    address_sl: "",
    address_town: "",
    address_county: "",
    address_postcode: "",
    delivery_instructions: "",
    dog_health: "",
    dog_weight: "",
    dog_size: "",
    flavours_not: [],
    veg: "",
    user_id: "",
    dog_name: "",
}

type AddressData = {
    address_fl: string;
    address_sl: string;
    address_town: string;
    address_county: string;
    address_postcode: string;
    user_id: string,
}

// const INITIAL_ADDRESS_DATA: AddressData = {
//     address_fl: "",
//     address_sl: "",
//     address_town: "",
//     address_county: "",
//     address_postcode: "",
//     user_id: "",
// }


  function Survey({
    updateFields,
    updateOrderFields
  }: {
    updateFields: (fields: Partial<DogFormData>) => void;
    updateOrderFields: (fields: Partial<OrderData>) => void;
  }) {
    const [data , setData] = useState(INITIAL_DATA);
    const [orderData, setOrderData] = useState(INITIAL_ORDER_DATA);

    const handleDataUpdate = (updatedFields: Partial<DogFormData>) => {
        // Create a new object by merging the existing data and updated fields
        const updatedData = { ...data, ...updatedFields };
        setData(updatedData);
        // Propagate the updated data to the parent component
        updateFields(updatedData);
    };


    const handleOrderDataUpdate = (updatedFields: Partial<OrderData>) => {
        const updatedOrderData = { ...orderData, ...updatedFields };
        setOrderData(updatedOrderData);
        // Propagate the updated orderData to the parent component
        updateOrderFields(updatedOrderData);
    };

    const { steps, currentStepIndex, isFirstStep, step, back, next, isLastStep} = useMultistepForm([
        <DogInfo {...data} updateFields={handleDataUpdate}/>,
        <DogBreed {...data} updateFields={handleDataUpdate}/>,
        <DogHealth {...data} updateFields={handleDataUpdate}/>,
        <DogFood {...data} updateFields={handleDataUpdate}/>,
        <OrderDetails {...orderData} updateOrderFields={handleOrderDataUpdate} />,
        <Confirmation surveyData={data} orderData={orderData} />
    ]) 
    console.log(data)
    console.log(orderData)


async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const signedIn = await isSessionSignedIn(); // Set variable to check if user is signed in
    console.log('is session signed in:', signedIn); // Log the actual value of signedIn

    ////////////////////^^^^^^^^^^^^^^^^^^^^^Returning true when not signed in but not acting as true - need to fix

    if (!signedIn) { // this is running if user is not signed in and if they are signed in, need to fix
        console.log("User is not signed in");

        // Store data in localStorage
        localStorage.setItem('pendingFormData', JSON.stringify(data));
        
        // Redirect to sign-up page
        window.location.href = '/SignUp'; // Change the URL as needed
        return;
    } 

    const userId = await getCurrentUserId(); // Get the user ID from the session

    if (!userId) {
        // Unable to get user ID, handle accordingly
    
        return;
    }

    if (!supabase) {
        console.error("Supabase client is null");
        return;
    }
    const dataToInsert: DogFormData = {
        dog_name: data.dog_name,
        dog_age: data.dog_age,
        dog_sex: data.dog_sex,
        dog_breed: data.dog_breed,
        pure_cross: data.pure_cross,
        dog_health: data.dog_health,
        dog_weight: data.dog_weight,
        dog_size: data.dog_size,
        flavours_not: data.flavours_not,
        veg: data.veg,
        user_id: userId, // Add the user ID to the data
    };

    const { data: insertData, error } = await supabase
        .from('dog')
        .insert([dataToInsert]);
        console.log(dataToInsert);

    console.log(insertData);
    
    if (error) {
        alert(error.message);
    } else {
        alert("Survey complete");
    }

    // I want to also insert orderData into order table
    const orderDataToInsert: OrderData = {
 
            days: orderData.days,
            address_fl:  orderData.address_fl,
            address_sl: orderData.address_sl,
            address_town: orderData.address_town,
            address_county:  orderData.address_county,
            address_postcode:  orderData.address_postcode,
            delivery_instructions:   orderData.delivery_instructions, 
            flavours_not: data.flavours_not,
            veg: data.veg,
            user_id: userId, 
            dog_health: data.dog_health,
            dog_weight: data.dog_weight,
            dog_size: data.dog_size,
            dog_name: data.dog_name,
    }

    const { data: insertOrderData, error: errorOrderData } = await supabase
        .from('order')
        .insert([orderDataToInsert]);
        console.log(orderDataToInsert);
        
    console.log(insertOrderData);

    if (errorOrderData) {
        alert(errorOrderData.message);
    } else {
        alert("Order complete");
    }
// Check if the address already exists for the user
const { data: existingAddressData, error: errorExistingAddressData } = await supabase
  .from('user_address')
  .select()
  .eq('user_id', userId);

if (errorExistingAddressData) {
  alert(errorExistingAddressData.message);
} else if (existingAddressData.length === 0) {
  // If the user doesn't have an existing address, insert the address data
  const addressDataToInsert: AddressData = {
    address_fl: orderData.address_fl,
    address_sl: orderData.address_sl,
    address_town: orderData.address_town,
    address_county: orderData.address_county,
    address_postcode: orderData.address_postcode,
    user_id: userId,
  };

  const { data: insertAddressData, error: errorAddressData } = await supabase
    .from('user_address')
    .insert([addressDataToInsert]);

  if (errorAddressData) {
    alert(errorAddressData.message);
  } else {
    alert('Order complete');
  }
} else {
  // Address already exists for the user, handle this case as needed
  console.log('User already has an address.');
}

    // Clear the pending form data from localStorage
    localStorage.removeItem('pendingFormData');
    // Redirect to the home page
    window.location.href = '/'; // Change the URL as needed
        




};



    return (
        <div className="survey">
            <div className="surveyContent">
                <form onSubmit={onSubmit}  className="surveyForm">
                    <div className="surveyFormNum">
                       { currentStepIndex +1} / {steps.length}
                    </div>
                    <div className="surveyFormSection">
                        {step}
                    </div>
                    <div className="surveyButtons">
                       {!isFirstStep && <button type='button' onClick={back} id='backSurveyButton' className="backSurveyButton">Back</button>}
                        <button type='submit' className="surveyButton">{isLastStep ? "Finish" : "Next"}</button>
                    </div>
                </form> 
            </div>

        </div>
    )
}



export default Survey
