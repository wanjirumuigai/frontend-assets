"use client";

import Link from "next/link";
import { useState } from "react";

function AddUser() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation:"",
    role:"",
    department: "",
    designation:""
  });
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState([])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit () {

   
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password_confirmation:"",
            role:"",
            department: "",
            designation:""
          });

        })
      } else {
        res.json().then((err) => setErrors(err.errors))
        
      }
    })

    
  };
 let displayErrs =Object.keys(errors).map(function(property) {
  return errors[property]
 })



  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
        <div className="flex justify-end mt-6">
        
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            <Link href="/assets">Cancel</Link>
          </button>
        </div>
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Add User
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstname}
                name="firstname"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>          

            <div>
              <label className="text-white dark:text-gray-200">
                Department
              </label>
              <input
                name="department"
                value={formData.department}
                type="text"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
               Designation
              </label>
              <input
                name="designation"
                value={formData.designation}
                type="text"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />              
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Select Role
              </label>
              <select
                onChange={handleChange}
                name="role"
                value={formData.role}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              >
                <option defaultValue={true}>Select Category</option>
                <option>Admin</option>
                <option>User</option>
               
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                type="password"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
               Confirm Password
              </label>
              <input
                name="password_confirmation"
                value={formData.password_confirmation}
                type="password"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            {displayErrs.length > 0 && (
    <ul style={{ color: "red" }}>
      {displayErrs.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )}
            
            
        </div>
       
        
          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default AddUser;
