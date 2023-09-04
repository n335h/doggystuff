import React from 'react';
import { useState } from 'react';
import { FormWrapper } from './FormWrapper';
import './Survey.css';


type BreedData = {
    dog_breed: string;
    pure_cross: string;
    

}


type BreedFormProps = BreedData & {  // DogInfoProps is a type that extends DogData with an updateFields function adding them together
    updateFields: (fields: Partial<BreedData>) => void; // updateFields is a function that takes in a partial of DogInfoProps
}


export function DogBreed( {dog_breed, pure_cross, updateFields}: BreedFormProps) {
    const [selectedDogBreed, setSelectedDogBreed] = useState(dog_breed);
    return (
        
            <FormWrapper title="What breed is your doggo?">
      
                <label htmlFor="dog_breed">Dog Breed</label>
                <select  title='breeddropdown' className='dropdownOptions' onChange={e=> updateFields({dog_breed: e.target.value}) } value={dog_breed}  id="dogBreed" name="dogBreed" placeholder="Dog Breed" required >
                
  <option value="" selected disabled>Select a breed...</option>
  <option value="affenpinscher">Affenpinscher</option>
  <option value="afghan_hound">Afghan Hound</option>
  <option value="airedale_terrier">Airedale Terrier</option>
  <option value="akita">Akita</option>
  <option value="alaskan_malamute">Alaskan Malamute</option>
  <option value="american_staffordshire_terrier">American Staffordshire Terrier</option>
  <option value="american_water_spaniel">American Water Spaniel</option>
  <option value="australian_cattle_dog">Australian Cattle Dog</option>
  <option value="australian_shepherd">Australian Shepherd</option>
  <option value="australian_terrier">Australian Terrier</option>
  <option value="basenji">Basenji</option>
  <option value="basset_hound">Basset Hound</option>
  <option value="beagle">Beagle</option>
  <option value="bearded_collie">Bearded Collie</option>
  <option value="bedlington_terrier">Bedlington Terrier</option>
  <option value="bernese_mountain_dog">Bernese Mountain Dog</option>
  <option value="bichon_frise">Bichon Frise</option>
  <option value="black_and_tan_coonhound">Black and Tan Coonhound</option>
  <option value="bloodhound">Bloodhound</option>
  <option value="border_collie">Border Collie</option>
  <option value="border_terrier">Border Terrier</option>
  <option value="borzoi">Borzoi</option>
  <option value="boston_terrier">Boston Terrier</option>
  <option value="bouvier_des_flandres">Bouvier des Flandres</option>
  <option value="boxer">Boxer</option>
  <option value="briard">Briard</option>
  <option value="brittany">Brittany</option>
  <option value="brussels_griffon">Brussels Griffon</option>
  <option value="bull_terrier">Bull Terrier</option>
  <option value="bulldog">Bulldog</option>
  <option value="bullmastiff">Bullmastiff</option>
  <option value="cairn_terrier">Cairn Terrier</option>
  <option value="canaan_dog">Canaan Dog</option>
  <option value="chesapeake_bay_retriever">Chesapeake Bay Retriever</option>
  <option value="chihuahua">Chihuahua</option>
  <option value="chinese_crested">Chinese Crested</option>
  <option value="chinese_shar_pei">Chinese Shar-Pei</option>
  <option value="chow_chow">Chow Chow</option>
  <option value="clumber_spaniel">Clumber Spaniel</option>
  <option value="cocker_spaniel">Cocker Spaniel</option>
  <option value="collie">Collie</option>
  <option value="curly_coated_retriever">Curly-Coated Retriever</option>
  <option value="dachshund">Dachshund</option>
  <option value="dalmatian">Dalmatian</option>
  <option value="doberman_pinscher">Doberman Pinscher</option>
  <option value="english_cocker_spaniel">English Cocker Spaniel</option>
  <option value="english_setter">English Setter</option>
  <option value="english_springer_spaniel">English Springer Spaniel</option>
  <option value="english_toy_spaniel">English Toy Spaniel</option>
  <option value="eskimo_dog">Eskimo Dog</option>
  <option value="finnish_spitz">Finnish Spitz</option>
  <option value="flat_coated_retriever">Flat-Coated Retriever</option>
  <option value="fox_terrier">Fox Terrier</option>
  <option value="foxhound">Foxhound</option>
  <option value="french_bulldog">French Bulldog</option>
  <option value="german_shepherd">German Shepherd</option>
  <option value="german_shorthaired_pointer">German Shorthaired Pointer</option>
  <option value="german_wirehaired_pointer">German Wirehaired Pointer</option>
  <option value="golden_retriever">Golden Retriever</option>
  <option value="gordon_setter">Gordon Setter</option>
  <option value="great_dane">Great Dane</option>
  <option value="greyhound">Greyhound</option>
  <option value="irish_setter">Irish Setter</option>
  <option value="irish_water_spaniel">Irish Water Spaniel</option>
  <option value="irish_wolfhound">Irish Wolfhound</option>
  <option value="jack_russell_terrier">Jack Russell Terrier</option>
  <option value="japanese_spaniel">Japanese Spaniel</option>
  <option value="keeshond">Keeshond</option>
  <option value="kerry_blue_terrier">Kerry Blue Terrier</option>
  <option value="komondor">Komondor</option>
  <option value="kuvasz">Kuvasz</option>
  <option value="labrador_retriever">Labrador Retriever</option>
  <option value="lakeland_terrier">Lakeland Terrier</option>
  <option value="lhasa_apso">Lhasa Apso</option>
  <option value="maltese">Maltese</option>
  <option value="manchester_terrier">Manchester Terrier</option>
  <option value="mastiff">Mastiff</option>
  <option value="mexican_hairless">Mexican Hairless</option>
  <option value="newfoundland">Newfoundland</option>
  <option value="norwegian_elkhound">Norwegian Elkhound</option>
  <option value="norwich_terrier">Norwich Terrier</option>
  <option value="otterhound">Otterhound</option>
  <option value="papillon">Papillon</option>
  <option value="pekingese">Pekingese</option>
  <option value="pointer">Pointer</option>
  <option value="pomeranian">Pomeranian</option>
  <option value="poodle">Poodle</option>
  <option value="pug">Pug</option>
  <option value="puli">Puli</option>
  <option value="rhodesian_ridgeback">Rhodesian Ridgeback</option>
  <option value="rottweiler">Rottweiler</option>
  <option value="saint_bernard">Saint Bernard</option>
  <option value="saluki">Saluki</option>
  <option value="samoyed">Samoyed</option>
  <option value="schipperke">Schipperke</option>
  <option value="schnauzer">Schnauzer</option>
  <option value="scottish_deerhound">Scottish Deerhound</option>
  <option value="scottish_terrier">Scottish Terrier</option>
  <option value="sealyham_terrier">Sealyham Terrier</option>
  <option value="shetland_sheepdog">Shetland Sheepdog</option>
  <option value="shih_tzu">Shih Tzu</option>
  <option value="siberian_husky">Siberian Husky</option>
  <option value="silky_terrier">Silky Terrier</option>
  <option value="skye_terrier">Skye Terrier</option>
  <option value="staffordshire_bull_terrier">Staffordshire Bull Terrier</option>
  <option value="soft_coated_wheaten_terrier">Soft-Coated Wheaten Terrier</option>
  <option value="sussex_spaniel">Sussex Spaniel</option>
  <option value="spitz">Spitz</option>
  <option value="tibetan_terrier">Tibetan Terrier</option>
  <option value="vizsla">Vizsla</option>
  <option value="weimaraner">Weimaraner</option>
  <option value="welsh_terrier">Welsh Terrier</option>
  <option value="west_highland_white_terrier">West Highland White Terrier</option>
  <option value="whippet">Whippet</option>
  <option value="yorkshire_terrier">Yorkshire Terrier</option>
</select>
<label htmlFor="pure_cross">They are a </label>
<div className='pureCross'>
            
                <button type="button" className={`pureCrossOption ${pure_cross === 'pure' ? 'selected' : ''}`} onClick={() => updateFields({pure_cross: 'pure'})}>Pure Breed</button>
                <button type="button" className={`pureCrossOption ${pure_cross === 'cross' ? 'selected' : ''}`} onClick={() => updateFields({pure_cross: 'cross'})}>Cross Breed</button>
                <button type="button" className={`pureCrossOption ${pure_cross === 'not_sure' ? 'selected' : ''}`} onClick={() => updateFields({pure_cross: 'not_sure'})}>Not Sure</button>
            </div>
            </FormWrapper>
        
    );
}

export default DogBreed;