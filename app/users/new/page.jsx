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
    <form onSubmit={handleSubmit} className="">
    
      <div class="mb-6">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
        <input type="text" name="firstName" id="" value={formData.firstName} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required  />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required  />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">P/F Number:</label>
        <input type="text" name="pfNumber" value={formData.pfNumber} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required  />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Number:</label>
        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
};

export default FormComponent;
