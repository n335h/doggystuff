
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

import "./Survey.css"
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
    flavours_not: [""],
    veg: "",
    user_id: "",
 
}




function Survey({ updateFields }: { updateFields: (fields: Partial<DogFormData>) => void }) {
    const [data , setData] = useState(INITIAL_DATA);

    const handleDataUpdate = (updatedFields: Partial<DogFormData>) => {
        // Create a new object by merging the existing data and updated fields
        const updatedData = { ...data, ...updatedFields };
        setData(updatedData);
        // Propagate the updated data to the parent component
        updateFields(updatedData);
    };

    const { steps, currentStepIndex, isFirstStep, step, back, next, isLastStep} = useMultistepForm([
        <DogInfo {...data} updateFields={handleDataUpdate}/>,
        <DogBreed {...data} updateFields={handleDataUpdate}/>,
        <DogHealth {...data} updateFields={handleDataUpdate}/>,
        <DogFood {...data} updateFields={handleDataUpdate}/>,

        
       
    ]) 
    console.log(data)
    console.log(steps)



    // async function onSubmit(e: FormEvent) {
    //     e.preventDefault();
    //     if (!isLastStep) return next();

        //W need to use isSessionSignedIn() & getCurrentUserId() to check if they are signed in (if not store data and redirect to sign up) get the user id and send with data -
        // - if they are signed in get the user id and send with data
        // const user = supabase.auth.user();
        // const userId = user?.id;
        // console.log(userId);
        // console.log(user);
        // console.log(supabase.auth.session());
        // console.log(supabase.auth.session()?.user?.id);


    // const user = supabase.auth.user();
    // const userId = user?.id;
    // console.log(userId);
    


//         if (supabase) { // Check if supabase is not null or undefined
//             const dataToInsert: DogFormData = {
//                 dog_name: data.dog_name,
//                 dog_age: data.dog_age,
//                 dog_sex: data.dog_sex,
//                 dog_breed: data.dog_breed,
//                 pure_cross: data.pure_cross,
//                 dog_health: data.dog_health,
//                 dog_weight: data.dog_weight,
//                 dog_size: data.dog_size,
//                 flavours_not: data.flavours_not,
//                 veg: data.veg,
//             };
            
            
//         const { data: insertData, error } = await supabase
//         .from('dog')
//         .insert([
//             dataToInsert,
//         ]);

//         console.log(insertData);
//     if (error) {
//         alert(error.message);
//     } else {
//         alert("Survey complete");
//     }    
// }};

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
}






    return (
        <div className="survey">
            <div className="surveyContent">
                <form onSubmit={onSubmit}  className="surveyForm">
                    <div className="surveyFormSection">
                       { currentStepIndex +1} / {steps.length}
                    </div>
                    <div className="surveyFormSection">
                    {step}
                    </div>
                    
                    <div className="surveyButtons">
                       {!isFirstStep && <button type='button' onClick={back} className="surveyButton">Back</button>}
                        <button type='submit' className="surveyButton">{isLastStep ? "Finish" : "Next"}</button>
                    </div>
                        </form> 
                        </div>

                
            </div>
    )
}



export default Survey
