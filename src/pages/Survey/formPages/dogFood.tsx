    import { FormWrapper } from "./FormWrapper";

    type FoodData = {
        flavours_not: string[] ;
        veg: string;
    
    }

    ///(TS2322: Type 'string' is not assignable to type 'string[]'.) occurs because you are trying to assign a string value to an array property (flavours_not) in the updateFields function within your onChange event handlers.
    type DogFoodProps = FoodData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
        updateFields: (fields: Partial<FoodData>) => void; // updateFields is a function that takes in a partial of DogInfoProps and processes the change
        // partial means that the fields that could be optional don't have to be included in the function call -accepts any subset of the DogData type- doesnt need all info to run updateFields
    }


    function DogFood({ flavours_not, veg, updateFields }: DogFoodProps) {
        const handleFlavoursNotChange = (selectedValue: string) => {
            if (flavours_not.includes(selectedValue)) {
              // If the value is already selected, remove it from the array
              updateFields({
                flavours_not: flavours_not.filter((value) => value !== selectedValue),
              });
            } else {
              // If the value is not selected, add it to the array
              updateFields({ flavours_not: [...flavours_not, selectedValue] });
            }
          };
        return (
            <div className="surveyFormSection">
                <FormWrapper title="Tell us what food your doggo likes">
                    <h3>What don't they like?

                    </h3>
                    <div className="dogFood">
                    <div className="flavoursNotContent">
                       
                    <button
              type="button"
              className={`flavoursNot ${
                flavours_not.includes('Pork') ? 'selected' : ''
              }`}
              onClick={() => handleFlavoursNotChange('Pork')}
            >
              Pork
            </button>
            <button
              type="button"
              className={`flavoursNot ${
                flavours_not.includes('Beef') ? 'selected' : ''
              }`}
              onClick={() => handleFlavoursNotChange('Beef')}
            >
              Beef
            </button>
            <button
              type="button"
              className={`flavoursNot ${
                flavours_not.includes('Chicken') ? 'selected' : ''
              }`}
              onClick={() => handleFlavoursNotChange('Chicken')}
            >
              Chicken
            </button>
            <button
              type="button"
              className={`flavoursNot ${
                flavours_not.includes('Fish') ? 'selected' : ''
              }`}
              onClick={() => handleFlavoursNotChange('Fish')}
            >
              Fish
            </button>
          </div>
                    <h3>Do they want vegetables?</h3>

                    <div className="foodVeg">
                      
                        {/* <input title="vegNo" type='radio' className='dropdownOptions'
                            onChange={e=> updateFields({veg: e.target.value}) }
                            value='No'
                            id='vegNo'
                            name='veg'
                            required
                        />
                        <label htmlFor='veg'>No Veg</label>

                        <input title="vegYes" type='radio' className='dropdownOptions'
                            onChange={e=> updateFields({veg: e.target.value}) }
                            value='Yes'
                            id='vegYes'
                            name='veg'
                            required
                        />
                        <label htmlFor='veg'>Veg</label> */}
                        <button
    type="button"
    className={`dogFoodOption ${
      veg === 'Yes' ? 'selected' : ''
    }`}
    onClick={() => updateFields({ veg: 'Yes' })}
  >
   Yes
  </button>
  <button
    type="button"
    className={`dogFoodOption ${
      veg === 'No' ? 'selected' : ''
    }`}
    onClick={() => updateFields({ veg: 'no' })}
  >
  No
  </button>



                    </div>
                    </div>
                </FormWrapper>
            </div>
        );
    }

    export default DogFood;