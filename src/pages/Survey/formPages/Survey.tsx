
import { useMultistepForm } from "../useMultistepForm"
import { DogBreed } from "./dogBreed"
import { DogHealth } from "./dogHealth"
import { useState } from "react"
import  DogInfo  from "./dogInfo"
import { FormEvent } from "react"
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
 
}

const INITIAL_DATA: DogFormData = {
    dog_name: "",
    dog_age: "",
    dog_sex: "",
    dog_breed: "",
    pure_cross: "",
    dog_health: "",
    dog_weight: "",
 
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
        
       
    ]) 
    console.log(data)
    console.log(steps)



    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) return next();
        console.log(data)
    
        const { data, error } = await supabase
            .from('dogs')
            .insert([
                {
                    dogName: data.dog_name,
                    dogAge: data.dog_age,
                    dogSex: data.dog_sex,
                    dogBreed: data.dog_breed,
                    pureCross: data.pure_cross,
                    dogHealth: data.dog_health,
                    dogWeight: data.dog_weight,
                },
            ]);
    
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
