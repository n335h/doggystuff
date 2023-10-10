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
                
                <FormWrapper title="Describe your doggos body">
                    <div className="surveyFormSectionContent">
                    <h3 className="dogHealthTitle">Dog Weight</h3>

                        <div className="dogHealth">
  <button
    type="button"
    className={`dogHealthOption ${
      dog_health === 'Needs some chonk' ? 'selected' : ''
    }`}
    onClick={() => updateFields({ dog_health: 'Needs some chonk' })}
  >
    Needs some chonk
  </button>
  <button
    type="button"
    className={`dogHealthOption ${
      dog_health === 'Just right' ? 'selected' : ''
    }`}
    onClick={() => updateFields({ dog_health: 'Just right' })}
  >
    Just Right
  </button>
  <button
    type="button"
    className={`dogHealthOption ${
      dog_health === 'Chonky' ? 'selected' : ''
    }`}
    onClick={() => updateFields({ dog_health: 'Chonky' })}
  >
    Chonky
  </button>
</div>



                            
                        </div>
                    

                </FormWrapper>
           
        );
    }

    export default DogHealth;
