
import { useMultistepForm } from "../useMultistepForm"
import { DogBreed } from "./dogBreed"
import { DogHealth } from "./dogHealth"
import { useState } from "react"
import { DogInfo } from "./dogInfo"
import { FormEvent } from "react"
import "./Survey.css"

type FormData = {
    dogName: string;
    dogAge: string;
    dogSex: string;
    dogBreed: string;
    pureCross: string;
    dogHealth: string;
    dogWeight: string;
 
}

const INITIAL_DATA: FormData = {
    dogName: "",
    dogAge: "",
    dogSex: "",
    dogBreed: "",
    pureCross: "",
    dogHealth: "",
    dogWeight: "",

}


function Survey() {
    const [data , setData] = useState(INITIAL_DATA)
    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
          return{...prev,...fields}
        })
    }
    
    const { steps, currentStepIndex, isFirstStep, step, back, next, isLastStep} = useMultistepForm([
        <DogInfo {...data} updateFields={updateFields}/>,
        <DogBreed {...data} updateFields={updateFields}/>,
        <DogHealth {...data} updateFields={updateFields}/>,
        
       
    ]) 
function onSubmit (e: FormEvent) {
    e.preventDefault()
    if (isLastStep) {
        alert("Survey complete") // can insert anythign here to send data to backend
    } else {
        next() 
    }
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
