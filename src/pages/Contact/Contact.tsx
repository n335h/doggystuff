import React, { FormEvent, useState } from 'react';
import './Contact.css';
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
        <div className="contactcontainer">
        <div className='conactcontent'>
             
          
            <form onSubmit={handleSubmit} id="contactForm">
            <h1>Barking up the right tree</h1>
            <p>From woof to welcome, Contact our pawsome team below</p>
                <div className="contactformgroup">
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
                <div className="contactformgroup">
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
                <div className="contactformgroup">
                    <label htmlFor="message"></label>
                    <textarea
                    className='contacttextarea'
                        id="message"
                        name="message"
                        placeholder='Message*'
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="contactformgroupbutton">
                    <button type="submit" value="Submit" > Submit</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Contact;
