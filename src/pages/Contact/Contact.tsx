// Updated JSX code with logical class names
import React, { FormEvent, useState } from 'react';
import './Contact.css';
import wave from '../../Assets/wave.svg';
import stars from '../../Assets/stars.svg';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Access form data from the state
        console.log('Name:', formData.name);
        console.log('Email:', formData.email);
        console.log('Message:', formData.message);

        // You can add form submission logic here
    };

    return (
        <div className="contact-container">
            <div className='contact-content'>
                <img src={stars} alt="wave" className="stars-img animate-pop-in"/>

                <form onSubmit={handleSubmit} id="contact-form">
                    <h1 className='contact-title animate-pop-in'>Barking up the right tree</h1>
                    <img src={wave} alt="wave" className="wave-img-contact animate-pop-in"/>
                    <p className='contact-para animate-pop-in'>From woof to welcome, Contact our pawsome team below</p>
                    <div className="contact-form-group animate-pop-in">
                        <label htmlFor="name"></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter name*'
                            required
                        />
                    </div>
                    <div className="contact-form-group animate-pop-in">
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email*'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="contact-form-group animate-pop-in">
                        <label htmlFor="message"></label>
                        <textarea
                            className='contact-textarea'
                            id="message"
                            name="message"
                            placeholder='Message*'
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="contact-form-group-button animate-pop-in">
                        <button type="submit" value="Submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
