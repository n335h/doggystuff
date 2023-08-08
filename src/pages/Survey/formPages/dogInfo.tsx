import { FormWrapper } from "./FormWrapper";

type DogData = {
    dogName: string;
    dogAge: string;
    dogSex: string;

}


type DogInfoProps = DogData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<DogInfoProps>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}

export function DogInfo({dogName, dogAge, dogSex, updateFields}: DogInfoProps ) {
  updateFields({dogName, dogAge, dogSex})
  
  
    return (
    <FormWrapper title="Doggo Info">
      <fieldset> 
    {/* // The FormWrapper component seems to have a title prop, but youre not using it as an accessible name for the form. You can fix this by providing a legend element inside the fieldset of your form. */}
        <legend>Dog Information</legend>

        <label htmlFor="dogName">Dog Name:</label>
        <input onChange={e=> updateFields({dogName: e.target.value}) } value={dogName} type="text" id="dogName" name="dogName" placeholder="Dog Name" />

        <label htmlFor="dogAge">Dog Age:</label>
        <select onChange={e=> updateFields({dogAge: e.target.value}) } value={dogAge} id="dogAge" name="dogAge">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
        </select>

        
        
        <label htmlFor="dogSex"></label>
        <input  onChange={e=> updateFields({dogSex: e.target.value}) } value={dogSex} type="text" id="dogSex" name="dogSex" placeholder="Male/Female" />
        </fieldset>
        </FormWrapper>
       

    )
}