"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditPage = ({ params }) => {
  const [asset, setAsset] = useState([]);
  const [formData, setFormData] = useState({
    assetName: asset.assetName,
    model: asset.model,
    tag: asset.tag,
    serialNumber: asset.serialNumber,
    category: asset.category,
    status: asset.status,
    purchasePrice: asset.purchasePrice,
  });
  const { assetId } = params;
  const router = useRouter();
  useEffect(() => {
    const fetchAsset = async () => {
      const res = await fetch(`http://localhost:3000/assets/${assetId}`);
      const data = await res.json();
      setAsset(data);
      setFormData(data);
    };
    fetchAsset();
  }, [assetId]);

  function handleCancel() {
    router.push("/assets/");
  }
  function handleSaveEdit(e) {
    e.preventDefault();
    console.log(formData);
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          {asset.assetName + ": " + asset.model}
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                Asset Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                value={formData.assetName}
                name="assetName"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Model</label>
              <input
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
                onChange={handleChange}
                type="text"
                name="tag"
                value={formData.tag}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Serial Number
              </label>
              <input
                onChange={handleChange}
                name="serialNumber"
                value={formData.serialNumber}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Category</label>
              <input
                onChange={handleChange}
                type="text"
                name="tag"
                value={formData.category}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Select Status
              </label>
              <select
                name="status"
                onChange={handleChange}
                value={formData.status}
                defaultValue={formData.status}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>Ready to Deploy</option>
                <option>Broken</option>
                <option>Out for Repair</option>
                <option>Deployed</option>
                <option>Obsolete</option>
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Assigned To
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="tag"
                value=""
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Department
              </label>
              <input
                onChange={handleChange}
                name="serialNumber"
                value=""
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Assigned By
              </label>
              <input
                onChange={handleChange}
                name="serialNumber"
                value=""
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Return Date
              </label>
              <input
                onChange={handleChange}
                name="serialNumber"
                value=""
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Received By
              </label>
              <input
                onChange={handleChange}
                name="serialNumber"
                value=""
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Purchase Price
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Notes</label>
              <textarea
                onChange={handleChange}
                type="textarea"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSaveEdit(e)}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditPage;
