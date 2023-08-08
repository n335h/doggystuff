import { FormWrapper } from "./FormWrapper";

type DogData = {
    dogName: string;
    dogAge: string;
    dogSex: string;

}


type DogInfoProps = DogData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<DogData>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}

function DogInfo({ dogName, dogAge, dogSex, updateFields }: DogInfoProps) {
    const handleDogNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
      updateFields({ dogName: e.target.value });
    };
  
    const handleDogAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateFields({ dogAge: e.target.value });
      console.log(dogAge);
    };
  
    const handleDogSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFields({ dogSex: e.target.value });
    };
  
    return (
      <FormWrapper title="Tell us about your Doggo">
        <legend>Dog Information</legend>
  
        <label htmlFor="dogName">Dog Name:</label>
        <input
          onChange={handleDogNameChange}
          value={dogName}
          type="text"
          id="dogName"
          name="dogName"
          placeholder="Dog Name"
          required
        />
  
        <label htmlFor="dogAge">Dog Age:</label>
        <select
        className='dropdownOptions'
          onChange={handleDogAgeChange}
          value={dogAge}
          id="dogAge"
          name="dogAge"
          required
        > <option value="1">0-1</option>
        <option value="2">1-2</option>
        <option value="3">2-5</option>
        <option value="4">6-10</option>
        <option value="5">10+</option>
        </select>
  
        <label htmlFor="dogSex">Male</label>
        <input type="radio" className='dropdownOptions'
          onChange={handleDogSexChange}
          value='male'
          id="dogSex"
          name="dogSex"
          required
        />
                <label htmlFor="dogSex">Female</label>
        <input type="radio" className='dropdownOptions'
          onChange={handleDogSexChange}
          value='Female'
          id="dogSex"
          name="dogSex"
          required
        />
           {/* <option  value="boy">Good Boy</option>
        <option value="girl"> Good Girl</option> */}

      
      </FormWrapper>
    );
  }
  
  export default DogInfo;