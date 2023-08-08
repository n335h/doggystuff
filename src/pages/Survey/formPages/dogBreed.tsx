import React from 'react';
import { FormWrapper } from './FormWrapper';


type BreedData = {
    dogBreed: string;
    pureCross: string;
    

}


type BreedFormProps = BreedData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<BreedData>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}


export function DogBreed( {dogBreed, pureCross, updateFields}: BreedFormProps) {
    return (
        
            <FormWrapper title="What breed is your doggo?">
                <h1> Dog Breed </h1>
                <h2> What breed is your doggo? </h2>
                <label htmlFor="dogBreed">Dog Breed</label>
                <input  onChange={e=> updateFields({dogBreed: e.target.value}) } value={dogBreed} type="text" id="dogBreed" name="dogBreed" placeholder="Dog Breed" required />
                <label htmlFor="pureCross">They are a </label>
                <select onChange={e=> updateFields({pureCross: e.target.value}) } value={pureCross}  name="pureCross" id="pureCross" required>
                    <option value="pure">Pure breed</option>
                    <option value="cross">Cross-breed</option>
                    <option value="notSure">Not sure</option>
                </select>
            </FormWrapper>
        
    );
}

export default DogBreed;