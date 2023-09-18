import React from 'react';
import { FormWrapper } from './FormWrapper';

type OrderData = {
    days: string;
    address_fl: string;
    address_sl: string;
    address_town: string;
    address_county: string;
    address_postcode: string;
    delivery_instructions: string;
}

type OrderDetailsProps = OrderData & {
    updateOrderFields: (fields: Partial<OrderData>) => void;
}

function OrderDetails({
    days,
    address_fl,
    address_sl,
    address_town,
    address_county,
    address_postcode,
    delivery_instructions,
    updateOrderFields,
}: OrderDetailsProps) {

    const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateOrderFields({ days: e.target.value });
    };

    const handleAddressFLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderFields({ address_fl: e.target.value });
    };

    const handleAddressSLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderFields({ address_sl: e.target.value });
    };

    const handleAddressTownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderFields({ address_town: e.target.value });
    };

    const handleAddressCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderFields({ address_county: e.target.value });
    };

    const handleAddressPostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderFields({ address_postcode: e.target.value });
    };

    const handleDeliveryInstructionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateOrderFields({ delivery_instructions: e.target.value });
    };



    return (
        <div className="surveyFormSection">
            <FormWrapper title="Order Confirmation - Delivery">
                <legend>Order Details</legend>
                <label htmlFor="days">Days</label>
                <select
                    className='dropdownOptions'
                    onChange={handleDaysChange}
                    value={days}
                    id="days"
                    name="days"
                    required
                >
                    <option value="">Select number of days</option>
                    <option value="7">7</option>
                    <option value="14">14</option>
                    <option value="21">21</option>
                    <option value="30">30</option>
                </select>
                <label htmlFor="address_fl">Address Line 1:</label>
                <input
                    onChange={handleAddressFLChange}
                    value={address_fl}
                    type="text"
                    id="address_fl"
                    name="address_fl"
                    placeholder="Address Line 1"
                    required
                />
                <label htmlFor="address_sl">Address Line 2:</label>
                <input
                    onChange={handleAddressSLChange}
                    value={address_sl}
                    type="text"
                    id="address_sl"
                    name="address_sl"
                    placeholder="Address Line 2"
                    required
                />
                <label htmlFor="address_town">Town:</label>
                <input
                    onChange={handleAddressTownChange}
                    value={address_town}
                    type="text"
                    id="address_town"
                    name="address_town"
                    placeholder="Town"
                    required
                />
                <label htmlFor="address_county">County:</label>
                <input
                    onChange={handleAddressCountyChange}
                    value={address_county}
                    type="text"
                    id="address_county"
                    name="address_county"
                    placeholder="County"
                    required
                />
                <label htmlFor="address_postcode">Postcode:</label>
                <input
                    onChange={handleAddressPostcodeChange}
                    value={address_postcode}
                    type="text"
                    id="address_postcode"
                    name="address_postcode"
                    placeholder="Postcode"
                    required
                />
                <label htmlFor="delivery_instructions">Delivery Instructions:</label>
                <input
                    onChange={handleDeliveryInstructionsChange}
                    value={delivery_instructions}
                    type="text"
                    id="delivery_instructions"
                    name="delivery_instructions"
                    placeholder="Delivery Instructions"
                    required
                />
            </FormWrapper>
        </div>
    );
}

export default OrderDetails;
