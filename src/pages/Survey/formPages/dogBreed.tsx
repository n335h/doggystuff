import React from 'react';
import { FormWrapper } from './FormWrapper';


type BreedData = {
    dog_breed: string;
    pure_cross: string;
    

}


type BreedFormProps = BreedData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<BreedData>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}


export function DogBreed( {dog_breed, pure_cross, updateFields}: BreedFormProps) {
    return (
        
            <FormWrapper title="What breed is your doggo?">
                <h1> Dog Breed </h1>
                <h2> What breed is your doggo? </h2>
                <label htmlFor="dog_breed">Dog Breed</label>
                <input  onChange={e=> updateFields({dog_breed: e.target.value}) } value={dog_breed} type="text" id="dogBreed" name="dogBreed" placeholder="Dog Breed" required />
                <label htmlFor="pure_cross">They are a </label>
                <select placeholder='Please Select'  title='pure_cross' className='dropdownOptions' onChange={e=> updateFields({pure_cross: e.target.value}) } value={pure_cross}  name="pureCross" id="pureCross" required>
                    <option value="free"></option>
                    <option value="pure">Pure breed</option>
                    <option value="cross">Cross-breed</option>
                    <option value="notSure">Not sure</option>
                </select>
            </FormWrapper>
        
    );
}

export default DogBreed;