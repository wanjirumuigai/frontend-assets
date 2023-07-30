"use client";
import React, { useEffect, useState } from "react";
import { Button, Table } from "@mantine/core";
import { IconEye, IconEdit, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
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
      const res = await fetch("http://localhost:4000/users");
      const data = await res.json();
      setUsers(data);
      setSearchItems(data);
    };

    fetchUsers();
  }, []);

  const fuse = new Fuse(users, options);



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


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
    <h1 className="main-heading text-4xl font-bold">user Management</h1>
    <Paper sx={{ width: "80%", overflow: "auto" }} className="mt-7">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell className="font-bold text-md uppercase">
               Firstname
              </StyledTableCell>
              <StyledTableCell className="font-bold text-md uppercase">
                Lastname
              </StyledTableCell>
              <StyledTableCell className="font-bold text-md uppercase">
                Email
              </StyledTableCell>
              <StyledTableCell className="font-bold text-md uppercase">
               Department
              </StyledTableCell>
              <StyledTableCell className="font-bold text-md uppercase">
               Designation
              </StyledTableCell>
              <StyledTableCell className="font-bold text-md uppercase">
               Role
              </StyledTableCell>
              <StyledTableCell className="font-bold text-md uppercase">
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="font-bold text-md"
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="font-bold text-md"
                  >
                    {user.firstname}
                  </StyledTableCell>
                  <StyledTableCell className="font-bold text-md">
                    {user.lastname}
                  </StyledTableCell>
                  <StyledTableCell className="font-bold text-md">
                    {user.email}
                  </StyledTableCell>
              
                  <StyledTableCell className="font-bold text-md text-center">
                    {user.department}
                  </StyledTableCell>                     
                 
                  <StyledTableCell className="font-bold text-md text-center">
                    {user.designation}
                  </StyledTableCell>                    
                 
                  <StyledTableCell className="font-bold text-md text-center">
                    {user.role}
                  </StyledTableCell>
                  <StyledTableCell className="font-bold text-md">
                    <Button.Group className="gap-1">
                      <Tooltip title="View user Details" placement="top" arrow className="cursor-pointer" onClick={() => handleViewButton(user.id)}>
                        <IconEye size="1.5rem" color="white" className="bg-amber-600 rounded"/>
                      </Tooltip>
                      <Tooltip title="Edit user Details" placement="top" arrow className="cursor-pointer" onClick={() => handleEdit(user.id)} >
                        <IconEdit size="1.5rem" color="white" className="bg-blue-600 rounded"/>
                      </Tooltip>
                    </Button.Group>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
    // <>
    //   <section className="w-full p-6 mx-auto bg-indigo-300 rounded-md shadow-md dark:bg-gray-800">
    //     <form className="ml-4 mt-5">
    //       <label
    //         for="default-search"
    //         class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    //       >
    //         Search
    //       </label>
    //       <div class="relative">
    //         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //           <svg
    //             class="w-4 h-4 text-gray-500 dark:text-gray-400"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 20 20"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    //             />
    //           </svg>
    //         </div>
    //         <input
    //           type="search"
    //           name="searchTerm"
    //           onKeyUp={handleSearch}
    //           id="default-search"
    //           class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           placeholder="Search by Name, P/F No., username..."
    //           required
    //         />
    //       </div>
    //     </form>
    //     <div className="ml-4">
    //       <Table
    //         captionSide="up"
    //         highlightOnHover
    //         horizontalSpacing="sm"
    //         verticalSpacing="sm"
    //         fontSize="md"
    //       >
    //         <caption>List of Users</caption>
    //         <thead>{ths}</thead>
    //         <tbody>{rows}</tbody>
    //       </Table>
    //     </div>
    //   </section>
    // </>
  );
};

export default ShowUsers;
