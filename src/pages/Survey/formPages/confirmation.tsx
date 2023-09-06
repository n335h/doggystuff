import React from 'react';

type SurveyData = {
    dog_name: string;
    dog_age: string;
    flavours_not: string[];
    veg: string;
}

type OrderData = {
    days: string;

    address_fl: string;
    address_sl: string;
    address_town: string;
    address_county: string;
    address_postcode: string;
    delivery_instructions: string;

}

interface SurveyDataProps {
    surveyData: SurveyData;
    orderData: OrderData;
}

function Confirmation({ surveyData, orderData }: SurveyDataProps) {
    return (
        <div className="confirmation">
            <h1> Check out {surveyData.dog_name}'s order</h1>

            {/* <p>Dog Name: {surveyData.dog_name}</p> */}
            <hr />
            <p> Food {surveyData.dog_name} doesnt like: {surveyData.flavours_not}  </p>
            <p> Did {surveyData.dog_name} want vegtables?  {surveyData.veg}</p>
     
            <p>You wanted food for: {orderData.days} days</p>
            <hr />
            <p> Delivery Address: <br></br>{orderData.address_fl} <br></br> {orderData.address_sl},<br></br> {orderData.address_town}, <br></br>{orderData.address_county},<br></br> {orderData.address_postcode}</p>

         
          
        </div>
    );
}

export default Confirmation;
