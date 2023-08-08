import React from 'react';
import { FormWrapper } from './FormWrapper';

type HealthData = {
    dogHealth: string;
    dogWeight: string;
    

}


type HealthFormProps = HealthData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<HealthData>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}

export function DogHealth({dogHealth, dogWeight, updateFields}: HealthFormProps ) {
    return (
        <div className="surveyFormSection">
            
            <FormWrapper title="Tell us about your doggo">
                <h3>How is your dog's health?</h3>
                <div className="surveyFormSectionContent">
                    <div className="surveyFormSectionContentItem">
                        <label htmlFor="dogHealth">Health</label>
                        <select className='dropdownOptions'  onChange={e=> updateFields({dogHealth: e.target.value}) } value={dogHealth} name="dogHealth" id="dogHealth" required>
                            <option value="healthy">Healthy</option>
                            <option value="overweight">Lil thic</option>
                            <option value="underweight">Needs some chonk</option>
                        </select>
                    </div>
                    <div className="surveyFormSectionContentItem">
                        <label htmlFor="dogWeight">They Weight</label>
                        <select className='dropdownOptions'  onChange={e=> updateFields({dogWeight: e.target.value}) } value={dogWeight} name="dogWeight" id="dogWeight" required>
                            <option value="healthy">Healthy</option>
                            <option value="overweight">Overweight</option>
                            <option value="underweight">Underweight</option>
                        </select>
                    </div>
                </div>
            </FormWrapper>
        </div>
    );
}

export default DogHealth;
