"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Table } from "@mantine/core";


const ths = (
  <tr>
    <th>NAME</th>
    <th>MODEL</th>
    <th>TAG</th>
    <th>SERIAL NO.</th>
  </tr>
);

const elements= [
  {name: "Mouse",
  model: "HP",
  tag: "KISE/ICT/3536",
  serialNumber: "36TDSJ",
}
]

const rows = elements.map((element) => (
  <tr key={element.id}>
     <td>{element.name}</td>
    <td>{element.model}</td>
    <td>{element.tag}</td>
    <td>{element.serialNumber}</td>
    
  </tr>
));

const ViewPage = ({ params }) => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    department: user.department,
    designation: user.designation
  });
  const { userId } = params;
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:4000/users/${userId}`);
      const data = await res.json();
      setUser(data);
      setFormData(data);
    };
    fetchUser();
  }, [userId]);

  function handleCancel() {
    router.push("/users");
  }
  function handleEdit() {
    router.push(`/users/edit/${userId}`);
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          {formData.firstname + " " + formData.lastname}
        </h1>
        <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstname}
                name="firstname"
                
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                
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
                
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />              
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Select Role
              </label>
              <select
                
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
            </div>
            {/* List of Assigned Assets */}
            <h1 className="mt-5"></h1>
            <Table className="text-slate-950">
      <caption className="mt-5">Assigned Assets </caption>
      <thead >{ths}</thead>
      <tbody>{rows}</tbody>
      
    </Table>



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

export default ViewPage;
