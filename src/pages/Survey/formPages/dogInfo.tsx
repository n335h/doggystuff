import React from 'react';
import { useState } from 'react';
import { FormWrapper } from './FormWrapper';

type DogData = {
  dog_name: string;
  dog_age: string;
  dog_sex: string;
  dog_size: string;
};

type DogInfoProps = DogData & {
  updateFields: (fields: Partial<DogData>) => void;
};

function DogInfo({
  dog_name,
  dog_age,
  dog_sex,
  dog_size,
  updateFields,
}: DogInfoProps) {
  const [selectedDogSize, setSelectedDogSize] = useState(dog_size);
  const [selectedDogSex, setSelectedDogSex] = useState(dog_sex);


  const handleDogNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ dog_name: e.target.value });
  };

  const handleDogAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAge = parseInt(e.target.value, 10);
    updateFields({ dog_age: e.target.value });
  };
  const handleDogSizeChange = (size: string) => {
    setSelectedDogSize(size);
    updateFields({ dog_size: size });
  };
  
  const handleDogSexChange = (sex: string) => {
    setSelectedDogSex(sex);
    updateFields({ dog_sex: sex });
  };
  return (
    <FormWrapper title="Tell us about your Doggo">


      <label htmlFor="dog_name"></label>
      <input
        onChange={handleDogNameChange}
        value={dog_name}
        type="text"
        id="dog_name"
        name="dog_name"
        placeholder="Dog Name"
        required
      />

      <label htmlFor="dog_age"> .</label>
      <select
        className="dropdownOptions"
        onChange={handleDogAgeChange}
        value={dog_age}
        id="dog_age"
        name="dog_age"
        required
      >
        <option value="free" disabled >Age</option>
        <option value="0-1">0-1</option>
        <option value="1-2">1-2</option>
        <option value="2-5">2-5</option>
        <option value="6-10">6-10</option>
        <option value="10+">10+</option>
      </select>

      <div className="dogSize">
      <button
  type="button"
  className={`dogSizeOption ${
    selectedDogSize === 'small' || dog_size === 'small' ? 'selected' : ''
  }`}
  onClick={() => handleDogSizeChange('small')}
>
  Small
</button>
<button
  type="button"
  className={`dogSizeOption ${
    selectedDogSize === 'medium' || dog_size === 'medium' ? 'selected' : ''
  }`}
  onClick={() => handleDogSizeChange('medium')}
>
  Medium
</button>
<button
  type="button"
  className={`dogSizeOption ${
    selectedDogSize === 'large' || dog_size === 'large' ? 'selected' : ''
  }`}
  onClick={() => handleDogSizeChange('large')}
>
  Large
</button>
      </div>

      <div className="dogSex">
      <button
  type="button"
  className={`dogSexOption ${
    selectedDogSex === 'male' || dog_sex === 'male' ? 'selected' : ''
  }`}
  onClick={() => handleDogSexChange('male')}
>
  Male
</button>
<button
  type="button"
  className={`dogSexOption ${
    selectedDogSex === 'female' || dog_sex === 'female' ? 'selected' : ''
  }`}
  onClick={() => handleDogSexChange('female')}
>
  Female
</button>
      </div>
    </FormWrapper>
  );
}

export default DogInfo;