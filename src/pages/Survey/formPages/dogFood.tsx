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
    
    const handleFlavoursNotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            updateFields({ flavours_not: [...flavours_not, selectedValue] });
        } else {
            updateFields({ flavours_not: flavours_not.filter(value => value !== selectedValue) });
        }
    };

    return (
        <div className="surveyFormSection">
            <FormWrapper title="Tell us about your doggo">
                <h3>How is your dog's health?</h3>
                <div className="surveyFormSectionContent">
                    <input
                        type="checkbox"
                        className='dropdownOptions'
                        onChange={handleFlavoursNotChange}
                        value="Pork"
                        id="flavours_not_pork"
                        name="flavours_not"
                     
                    />
                    <label htmlFor="flavours_not_pork">Pork</label>

                    <input
                        type="checkbox"
                        className='dropdownOptions'
                        onChange={handleFlavoursNotChange}
                        value="Beef"
                        id="flavours_not_beef"
                        name="flavours_not"
                    
                    />
                    <label htmlFor="flavours_not_beef">Beef</label>

                    <input
                        type="checkbox"
                        className='dropdownOptions'
                        onChange={handleFlavoursNotChange}
                        value="Chicken"
                        id="flavours_not_chicken"
                        name="flavours_not"
                       
                    />
                    <label htmlFor="flavours_not_chicken">Chicken</label>
                </div>

                <div className="surveyFormSectionContent">
                    <input type='radio' className='dropdownOptions'
                          onChange={e=> updateFields({veg: e.target.value}) }
                        value='No'
                        id='veg'
                        name='veg'
                        required
                    />
                    <label htmlFor='veg'>No Veg</label>

                    <input type='radio' className='dropdownOptions'
                           onChange={e=> updateFields({veg: e.target.value}) }
                        value='Yes'
                        id='veg'
                        name='veg'
                        required
                    />
                    <label htmlFor='veg'>Veg</label>
                </div>
            </FormWrapper>
        </div>
    );
}

export default DogFood;