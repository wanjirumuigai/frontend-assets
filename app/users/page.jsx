"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "@mantine/core";
import { IconEye, IconEdit, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import Fuse from "fuse.js";

const options = {
  includeScore: true,
  keys: ["firstName", "lastName", "username", "pfnumber", "department"],
};
const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
      setSearchItems(data);
    };

    fetchUsers();
  }, []);

  const fuse = new Fuse(users, options);
  const ths = (
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>P/F Number</th>
      <th>Department</th>
      <th>Actions</th>
    </tr>
  );

  const rows = searchItems.map((element) => (
    <tr key={element.id} id={element.id}>
      <td>{element.firstName}</td>
      <td>{element.lastName}</td>
      <td>{element.username}</td>
      <td>{element.pfnumber}</td>
      <td>{element.department}</td>
      <td>
        {" "}
        <Button.Group>
          <Button
            variant="outline"
            onClick={() => handleViewButton(element.id)}
            leftIcon={<IconEye size="1rem" />}
          >
            View
          </Button>
          <Button
            onClick={() => handleEdit(element.id)}
            variant="outline"
            leftIcon={<IconEdit size="1rem" />}
          >
            Edit
          </Button>
        </Button.Group>
      </td>
    </tr>
  ));

  function handleViewButton(id) {
    router.push(`/users/${id}`);
  }

  function handleEdit(id) {
    router.push(`/users/edit/${id}`);
  }

  function handleSearch(e) {
    const foundItems = fuse
      .search(e.target.value)
      .map((element) => element.item);
    if (foundItems.length === 0) {
      setSearchItems(users);
    } else {
      setSearchItems(foundItems);
    }
  }

  return (
    <>
      <section className="w-full p-6 mx-auto bg-indigo-300 rounded-md shadow-md dark:bg-gray-800">
        <form className="ml-4 mt-5">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              name="searchTerm"
              onKeyUp={handleSearch}
              id="default-search"
              class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Name, P/F No., username..."
              required
            />
          </div>
        </form>
        <div className="ml-4">
          <Table
            captionSide="up"
            highlightOnHover
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fontSize="md"
          >
            <caption>List of Users</caption>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default ShowUsers;
