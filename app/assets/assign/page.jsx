"use client";
import { openSpotlight } from "@mantine/spotlight";
import React, { useState, useEffect } from "react";
import { Table } from "@mantine/core";
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

import { Modal, Button, Group } from "@mantine/core";
import SearchUser from "@/components/SearchUser";
import Fuse from "fuse.js";
import Link from "next/link";

const options = {
  includeScore: true,
  keys: ["firstName", "lastName", "email"],
};

const AssignAsset = () => {
  const [assets, setAssets] = useState([]);
  const [assigns, setAssigns] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [assignedItem, setAssignedItems] = useState([]);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("Add user");

  // Receive id from the assets page
  const id = router.query;
  console.log(router.query);

  const [userId, setUserId] = useState(0);
  const [assignee, setAssignee] = useState({});
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState([]);

  const fuse = new Fuse(users, options);
  const ths = (
    <tr>
      <th>Asset Name</th>
      <th>Model</th>
      <th>Tag Number</th>
      <th>Serial Number</th>
    </tr>
  );

  useEffect(() => {
    const fetchAssigns = async () => {
      const res = await fetch("http://localhost:4000/assigns");
      const data = await res.json();
      setAssigns(data);
    };

    fetchAssigns();
  }, []);
  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assets");
      const data = await res.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  const issued_assets = assigns.filter(asset => asset.is_returned === false).map(assign => assign.asset_id);
  const available_assets = assets.filter(asset => !issued_assets.includes(asset.id));

  const [assetsId, setAssetsID] = useState([]);

  function handleAddAsset(asset) {
    setSearchItems([...searchItems, asset]);
    setAssetsID([...assetsId, asset.id]);
    setFormData([
      ...formData,
      {
        user_id: assignee.id,
        department: assignee.department,
        asset_id: asset.id,
        location: location,
        assigned_by: "Pauline",
      },
    ]);
  }

  function handleDelete(id) {
    const afterDeletion = searchItems.filter((item) => item.id != id);
    setSearchItems(afterDeletion);
    setAssetsID(afterDeletion.map((item) => item.id));
  }

  function handleView(id) {
    router.push(`/assets/${id}`);
  }

  const actions = available_assets.map((asset) => ({
    title: asset.asset_name + " " + asset.model,
    description: "Tag: " + asset.asset_tag + " " + "Serial: " + asset.serial_no,
    onTrigger: () => handleAddAsset(asset),
    icon: <IconDeviceDesktop size="1.2rem" />,
  }));
  const rows = searchItems.map((element) => (
    <tr key={element.id}>
      <td>{element.asset_name}</td>
      <td>{element.model}</td>
      <td>{element.asset_tag}</td>
      <td>{element.serial_no}</td>

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
    fetch("http://localhost:4000/assigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ _json: formData }),
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          setFormData({
            user_id: "",
            department: "",
            asset_id: "",
            location: "",
            assigned_by: "",
          });
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function getUser(obj) {
    setSelectedUser(obj[0].firstname + " " + obj[0].lastname);
    setUserId(obj[0].id);
    setAssignee(obj[0]);
  }

  function handleChange(e) {
    setLocation(e.target.value);
  }

  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
          <Link
          href={`/assets`}>Cancel</Link>
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
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white dark:text-gray-200">Select User</label>
            <select
              value={selectedUser}
              name=""
              onClick={open}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option>{selectedUser}</option>
            </select>
          </div>

          <div>
            <label className="text-white dark:text-gray-200">Location</label>
            <input
              name="location"
              value={location}
              type="text"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        </div>
        <div>
          <label className="text-white dark:text-gray-200">Add Assets</label>
          <select
            name=""
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
      <SearchUser open={open} opened={opened} close={close} getUser={getUser} />
    </section>
  );
};

export default AssignAsset;
