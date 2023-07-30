"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ViewUser = ({ params }) => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password_digest: user.password_digest,
    department: user.department,
    designation: user.designation
  });
  const { userId } = params;
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await res.json();
      setUser(data);
      setFormData(data);
    };
    fetchUser();
  }, [userId]);

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          {formData.firstName + " " + formData.lastName}
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                name="firstName"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Last Name</label>
              <input
              type="text"
                name="lastName"
                value={formData.lastName}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Password 
              </label>
              <input
                name="password_digest"
                value={formData.password_digest}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              <Link href="/users">Cancel</Link>
            </button>
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              <Link href={`/users/edit/${userId}`}>Edit</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ViewUser;
