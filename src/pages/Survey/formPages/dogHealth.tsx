import React from 'react';
import { FormWrapper } from './FormWrapper';

type HealthData = {
    dog_health: string;
    dog_weight: string;
    

}


type HealthFormProps = HealthData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<HealthData>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}

export function DogHealth({dog_health, dog_weight, updateFields}: HealthFormProps ) {
    return (
        <div className="surveyFormSection">
            
            <FormWrapper title="Tell us about your doggo">
                <h3>How is your dog's health?</h3>
                <div className="surveyFormSectionContent">
                    <div className="surveyFormSectionContentItem">
                        <label htmlFor="dog_health">Health</label>
                        <select title='dog_health' className='dropdownOptions'  onChange={e=> updateFields({dog_health: e.target.value}) } value={dog_health} name="dogHealth" id="dogHealth" required>
                            <option value="healthy">Healthy</option>
                            <option value="overweight">Lil thic</option>
                            <option value="underweight">Needs some chonk</option>
                        </select>
                    </div>
                    <div className="surveyFormSectionContentItem">
                        <label htmlFor="dog_weight">They Weight</label>
                        <select title='dog_weight' className='dropdownOptions'  onChange={e=> updateFields({dog_weight: e.target.value}) } value={dog_weight} name="dogWeight" id="dogWeight" required>
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
