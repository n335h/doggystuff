import { FormWrapper } from "./FormWrapper";

type DogData = {
    dog_name: string;
    dog_age: string;
    dog_sex: string;

}


type DogInfoProps = DogData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<DogData>) => void; // updateFields is a function that takes in a partial of DogInfoProps and processes the change
    // partial means that the fields that could be optional don't have to be included in the function call -accepts any subset of the DogData type- doesnt need all info to run updateFields
}

function DogInfo({ dog_name, dog_age, dog_sex, updateFields }: DogInfoProps) {
    const handleDogNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
      updateFields({ dog_name: e.target.value });
    };
  
    const handleDogAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedAge = parseInt(e.target.value, 10);
      updateFields({ dog_age: e.target.value });
      console.log(dog_age);
    };
  
    const handleDogSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFields({ dog_sex: e.target.value });
    };
  
    return (
      <FormWrapper title="Tell us about your Doggo">
        <legend>Dog Information</legend>
  
        <label htmlFor="dog_name">Dog Name:</label>
        <input
          onChange={handleDogNameChange}
          value={dog_name}
          type="text"
          id="dog_name"
          name="dog_name"
          placeholder="Dog Name"
          required
        />
  
        <label htmlFor="dog_age">Dog Age:</label>
        <select
        className='dropdownOptions'
          onChange={handleDogAgeChange}
          value={dog_age}
          id="dog_age"
          name="dog_age"
          required
        > 
            <option value="free"></option>
            <option value="0-1">0-1</option>
        <option value="1-2">1-2</option>
        <option value="2-5">2-5</option>
        <option value="6-10">6-10</option>
        <option value="10+">10+</option>
        </select>
  
        <label htmlFor="dog_sex">Male</label>
        <input  type="radio" className='dropdownOptions'
          onChange={handleDogSexChange}
          value='male'
          id="dog_sex"
          name="dog_sex"
          required
        />
                <label htmlFor="dog_sex">Female</label>
        <input placeholder='Please Select'  type="radio" className='dropdownOptions'
          onChange={handleDogSexChange}
          value='Female'
          id="dog_sex"
          name="dog_sex"
          required
        />
           {/* <option  value="boy">Good Boy</option>
        <option value="girl"> Good Girl</option> */}

      
      </FormWrapper>
    );
  }
  
  export default DogInfo;