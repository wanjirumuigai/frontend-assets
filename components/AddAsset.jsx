'use client'

import { useState } from "react";




function AddAsset() {

const [formData, setFormData] = useState({
  assetName: '',
  model:'',
  tag: '',
  serialNumber: '',
  category:'',
  status: '',
  purchasePrice: '',

})
const [checked, setChecked] = useState(false);

function handleChange(e) {
    setFormData({
        ...formData,
                [e.target.name]: e.target.value,
          forDisposal: checked
      });
}

const handleSubmit = () => {

    // fetch("http://localhost:3000/assets", {
    //     method: "POST",
    //     body: JSON.stringify(
    //       formData,
    //     ),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }).catch((e) => console.log(e));

    console.log(formData)

      setFormData({
        assetName: '',
  model:'',
  tag: '',
  serialNumber: '',
  category:'',
  status: '',
  purchasePrice: '',

      })


}


  return (
    <>
<section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
<div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Cancel</button>
        </div>
    <h1 className="text-xl font-bold text-white capitalize dark:text-white">Add Asset</h1>
    <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()}}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-white dark:text-gray-200" >Asset Name</label>
                <input type="text" value={formData.assetName} name='assetName' onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Model</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Asset Tag</label>
                <input  type="text" name="tag" value={formData.tag} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required/>
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Serial Number</label>
                <input  name="serialNumber" value={formData.serialNumber}  type="text" onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-white dark:text-gray-200" >Select Category</label>
                <select onChange={handleChange} name="category" value={formData.category}  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" required>
                <option defaultValue={true}>Select Category</option>
                    <option>Accessories</option>
                    <option>Laptops</option>
                    <option>Desktops</option>
                    <option>Servers</option>
                    <option>Networking</option>
                    <option>Audio/Visual</option>
                </select>
            </div>
            <div>
                <label className="text-white dark:text-gray-200" >Select Status</label>
                <select name="status" onChange={handleChange} value={formData.status}  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option defaultValue={true} >Select Status</option>
                    <option>Ready to Deploy</option>
                    <option>Broken</option>
                    <option>Out for Repair</option>
                    <option>Deployed</option>
                    <option>Obsolete</option>
                </select>
            </div>
            <div>
                <label className="text-white dark:text-gray-200" >Purchase Price</label>
                <input  type="number" name="purchasePrice" value={formData.purchasePrice}  onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label className="text-white dark:text-gray-200" >Notes</label>
                <textarea id="textarea" type="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
            </div>

            </div>
            <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input  type="checkbox"  value={checked} name="forDisposal" onChange={(checked) => setChecked(!checked)}  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"/>
    </div>
    <label  className="ml-2 text-white dark:text-gray-200">Marked for Disposal?</label>
  </div>


        <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
    </form>
</section>


</>
  );
}
export default AddAsset
