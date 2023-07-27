"use client"
import React, { useState } from 'react';
import axios from 'axios';
import '../../globals.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pfNumber: '',
    idNumber: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the Rails backend using Axios
    axios.post('/api/submit', formData)
      .then((response) => {
        console.log(response.data); // Handle the response from Rails, if needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>
      <div>
        <label>P/F Number:</label>
        <input type="text" name="pfNumber" value={formData.pfNumber} onChange={handleChange} />
      </div>
      <div>
        <label>ID Number:</label>
        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
      </div>
      <div>
        <label>Department:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
