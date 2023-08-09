"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

const ths = (
  <tr>
    <th>NAME</th>
    <th>MODEL</th>
    <th>TAG</th>
    <th>SERIAL NO.</th>
    <th>Action</th>
  </tr>
);

const ViewPage = ({ params }) => {
  const [user, setUser] = useState([]);
  const [assetIds, setAssetIds] = useState([]);
  const [assets, setAssets] = useState([]);
  const [assigns, setAssigns] = useState([]);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    department: user.department,
    designation: user.designation,
  });
  const token = JSON.parse(sessionStorage.getItem("user")).jwt;

  const { userId } = params;
  const router = useRouter();
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
    return () => setAssetIds([]);
  }, [userId]);

  useEffect(() => {
    if (user.assigns) {
      const asset_ids = user.assigns
        .filter((asset) => asset.is_returned === false)
        .map((assign) => assign.asset_id);
      setAssetIds(asset_ids);
    }
  }, [user]);

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assets");
      const data = await res.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assigns");
      const data = await res.json();
      setAssigns(data);
    };

    fetchAssets();
  }, []);

  const userAssets = assets.filter((asset) => assetIds.includes(asset.id));

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
              <label className="text-white dark:text-gray-200">Role</label>
              <input
                name="role"
                type="text"
                value={formData.role}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          {/* List of Assigned Assets */}
          <h1 className="mt-5"></h1>
          <Table className="text-slate-950 bg-white">
            <caption className="mt-5">Assigned Assets </caption>
            <thead>{ths}</thead>
            <tbody>
              {userAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.asset_name}</td>
                  <td>{asset.model}</td>
                  <td>{asset.asset_tag}</td>
                  <td>{asset.serial_no}</td>
                  <td>
                    {
                      <Link href={`/assets/${asset.id}`}>
                        <IconEye
                          size="1.5rem"
                          color="white"
                          className="bg-amber-600 rounded"
                        />
                      </Link>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
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
