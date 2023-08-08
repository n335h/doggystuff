
import { useMultistepForm } from "../useMultistepForm"
import { DogBreed } from "./dogBreed"
import { DogHealth } from "./dogHealth"
import { useState } from "react"
import  DogInfo  from "./dogInfo"
import { FormEvent } from "react"
import "./Survey.css"

type DogFormData = {
    dogName: string;
    dogAge: string;
    dogSex: string;
    dogBreed: string;
    pureCross: string;
    dogHealth: string;
    dogWeight: string;
 
}

const INITIAL_DATA: DogFormData = {
    dogName: "",
    dogAge: "",
    dogSex: "",
    dogBreed: "",
    pureCross: "",
    dogHealth: "",
    dogWeight: "",

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

function onSubmit (e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next() 
    alert ("Survey complete")

}


    return (
        <div className="survey">
            <div className="surveyContent">
                <h1 className="survey-title">Tell us about your dog</h1>
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
