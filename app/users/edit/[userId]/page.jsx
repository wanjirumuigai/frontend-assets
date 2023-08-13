"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditPage = ({ params }) => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: "",
    password_confirmation: "",
    role: user.role,
    department: user.department,
    designation: user.designation,
  });
  const { userId } = params;
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const token = JSON.parse(sessionStorage.getItem("user")).jwt;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
      setFormData(data);
    };
    fetchUser();
  }, [userId]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleUpdate() {
    fetch(`http://localhost:4000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setFormData(data);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  let displayErrs = Object.keys(errors).map(function (property) {
    return errors[property];
  });

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            <Link href="/users">Cancel</Link>
          </button>
        </div>
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Edit User
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
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
                readOnly
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
                readOnly
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
                readOnly
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
                <option>Select Category</option>
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Password</label>
              <input
                name="password"
                value={formData.password}
                type="password"
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          {displayErrs.length > 0 && (
            <ul style={{ color: "red" }}>
              {displayErrs.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditPage;
