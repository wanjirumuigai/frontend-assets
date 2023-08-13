import { openSpotlight } from "@mantine/spotlight";
import React, { useState, useEffect } from "react";
import { Button, Group, Modal, Table } from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";

import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
  IconEdit,
  IconTrash,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

const AssignAsset = () => {
  const [assets, setAssets] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [assignedItem, setAssignedItems] = useState([]);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const token = JSON.parse(sessionStorage.getItem("user")).jwt;

  const ths = (
    <tr>
      <th>Asset Name</th>
      <th>Model</th>
      <th>Tag Number</th>
      <th>Serial Number</th>
    </tr>
  );

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:3000/assets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  function handleAddAsset(asset) {
    setSearchItems([...searchItems, asset]);
  }
  function handleDelete(id) {
    const afterDeletion = searchItems.filter((item) => item.id != id);
    setSearchItems(afterDeletion);
  }

  function handleView(id) {
    router.push(`/view/${id}`);
  }

  const actions = assets.map((asset) => ({
    title: asset.assetName + " " + asset.model,
    description: "Tag: " + asset.tag + " " + "Serial: " + asset.serialNumber,
    onTrigger: () => handleAddAsset(asset),
    icon: <IconDeviceDesktop size="1.2rem" />,
  }));
  const rows = searchItems.map((element) => (
    <tr key={element.id}>
      <td>{element.assetName}</td>
      <td>{element.model}</td>
      <td>{element.tag}</td>
      <td>{element.serialNumber}</td>

      <td>
        <Button
          variant="outline"
          onClick={() => handleView(element.id)}
          leftIcon={<IconEye size="1rem" />}
        >
          View
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            handleDelete(element.id), open;
          }}
          leftIcon={<IconTrash size="1rem" />}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  function handleSubmit() {
    console.log("submitted");
  }

  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
          Cancel
        </button>
      </div>
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Assign Asset
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="text-white dark:text-gray-200">Select Staff</label>
          <select
            name="status"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option defaultValue={true}>Select Staff</option>
            <option>Mary Moraa</option>
            <option>John Kamau</option>
            <option>Damaris Mueni</option>
            <option>Caroline Njeru</option>
            <option>Wayua Muli</option>
          </select>
        </div>
        <div>
          <label className="text-white dark:text-gray-200">Add Assets</label>
          <select
            name="status"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            onClick={spotlight.open}
          >
            <option defaultValue={true}>Add Assets</option>
          </select>
        </div>

        <div className=" bg-slate-300 mt-6 ">
          <div>
            {searchItems.length === 0 ? (
              <h5>Add Items to Assign</h5>
            ) : (
              <h5>Items to be Assigned</h5>
            )}
          </div>
          <div>
            <Table>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            Save
          </button>
        </div>
      </form>
      <SpotlightProvider
        actions={actions}
        searchIcon={<IconSearch size="1.2rem" />}
        searchPlaceholder="Search..."
        shortcut="mod + shift + 1"
        nothingFoundMessage="Nothing found..."
      ></SpotlightProvider>
    </section>
  );
};

export default AssignAsset;
