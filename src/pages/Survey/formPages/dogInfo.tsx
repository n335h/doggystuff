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
  
    const handleDogSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateFields({ dogSex: e.target.value });
    };
  
    return (
      <FormWrapper title="Doggo Info">
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
          onChange={handleDogAgeChange}
          value={dogAge}
          id="dogAge"
          name="dogAge"
          required
        > <option value="1">1</option>
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
  
        <label htmlFor="dogSex">Dog Sex:</label>
        <select
          onChange={handleDogSexChange}
          value={dogSex}
          id="dogSex"
          name="dogSex"
          required
        >
           <option value="boy">Boy</option>
        <option value="girl">Girl</option>

        </select>
      </FormWrapper>
    );
  }
  
  export default DogInfo;