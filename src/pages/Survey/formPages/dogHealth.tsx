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
                
                <FormWrapper title="Describe your doggos body">
                    <div className="surveyFormSectionContent">
                        <div className="surveyFormSectionContentItem">
                            <label htmlFor="dog_health">Health</label>
                            <select placeholder='Please Select'  title='dog_health' className='dropdownOptions'  onChange={e=> updateFields({dog_health: e.target.value}) } value={dog_health} name="dogHealth" id="dogHealth" required>
                                <option value="free"></option>
                                <option value="Needs some chonk">Healthy</option>
                                <option value="Just right">Lil thic</option>
                                <option value="Chonky">Needs some chonk</option>
                            </select>
                        </div>
                    

                    </div>
                </FormWrapper>
            </div>
        );
    }

    export default DogHealth;
