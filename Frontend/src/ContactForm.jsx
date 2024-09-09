import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    clientMail: '',
    number: '',
    text: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://contact-api-delta.vercel.app/send-email', formData);
      alert('Email sent successfully');
    } catch (error) {
      alert('Error sending email');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="fName" value={formData.fName} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lName" value={formData.lName} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="clientMail" value={formData.clientMail} onChange={handleChange} required />
      </label>
      <label>
        Phone Number:
        <input type="text" name="number" value={formData.number} onChange={handleChange} required />
      </label>
      <label>
        Message:
        <textarea name="text" value={formData.text} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
