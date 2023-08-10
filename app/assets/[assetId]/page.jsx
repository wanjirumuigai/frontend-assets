"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditPage = ({ params }) => {
  const [asset, setAsset] = useState([]);
  const [formData, setFormData] = useState({
    asset_name: asset.asset_name,
    model: asset.model,
    asset_tag: asset.asset_tag,
    serial_no: asset.serial_no,
    category: asset.category,
    status: asset.status,
    purchase_price: asset.purchase_price,
    notes: asset.notes,
  });
  const { assetId } = params;
  const router = useRouter();
  const token = JSON.parse(sessionStorage.getItem("user")).jwt;
  useEffect(() => {
    const fetchAsset = async () => {
      const res = await fetch(`http://localhost:4000/assets/${assetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAsset(data);
      setFormData(data);
    };
    fetchAsset();
  }, [assetId]);

  function handleCancel() {
    router.push("/assets");
  }
  function handleEdit() {
    router.push(`/edit/${assetId}`);
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-2">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          {asset.asset_name + ": " + asset.model}
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                Asset Name
              </label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                value={formData.asset_name}
                name="asset_name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Model</label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="model"
                value={asset.model}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Asset Tag</label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="asset_tag"
                value={formData.asset_tag}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Serial Number
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="serial_no"
                value={formData.serial_no}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Category</label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="category"
                value={formData.category}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Status</label>
              <input
                readOnly
                name="status"
                onChange={handleChange}
                value={formData.status}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Assigned To
              </label>
              <input
                readOnly
                onChange={handleChange}
                type="text"
                name="assigned_to"
                value={
                  !asset.users || asset.users.length === 0
                    ? "N/A"
                    : asset.users[0].firstname
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Department
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="department"
                value={
                  !asset.users || asset.users.length === 0
                    ? "N/A"
                    : asset.users[0].department
                }
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Assigned By
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="assigned_by"
                value={
                  !asset.assigns || asset.assigns.length === 0
                    ? "N/A"
                    : asset.assigns[0].assigned_by
                }
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Return Date
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="return_date"
                value={
                  !asset.assigns || asset.assigns.length === 0
                    ? "N/A"
                    : asset.assigns[0].return_date
                }
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Received By
              </label>
              <input
                readOnly
                onChange={handleChange}
                name="received_by"
                value={
                  !asset.assigns || asset.assigns.length === 0
                    ? "N/A"
                    : asset.assigns[0].received_by
                }
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Purchase Price
              </label>
              <input
                readOnly
                onChange={handleChange}
                type="number"
                name="purchase_price"
                value={formData.purchase_price}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                type="textarea"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              <Link href="/assets">Cancel</Link>
            </button>
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              <Link href={`/edit/${assetId}`}>Edit</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditPage;
