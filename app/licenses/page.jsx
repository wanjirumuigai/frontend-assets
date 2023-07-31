"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mantine/core";
import { IconEye, IconEdit, IconSearch } from "@tabler/icons-react";
import Tooltip from "@mui/material/Tooltip";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import NewLicenseForm from "@/components/NewLicense";
import { MdNoteAdd } from "react-icons/md";

export default function LicensePage() {
  const [licenses, setLicenses] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchLicenses = async () => {
      const response = await fetch("http://127.0.0.1:4000/licenses");
      const data = await response.json();
      setLicenses(data);
    };
    fetchLicenses();
  }, []);

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

  // Handle the new license details
  const [licenseForm, setLicenseForm] = useState({
    license_name: "",
    purchase_date: "",
    expiry_date: "",
    number_of_users: 1,
  });

  function handleChange(e) {
    setLicenseForm({
      ...licenseForm,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitForm (e){
    // e.preventDefault()
    fetch("http://localhost:4000/licenses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(licenseForm),
    }).catch((e) => console.log(e));

    setLicenseForm({
      license_name: "",
      purchase_date: "",
      expiry_date: "",
      number_of_users: 1,
    });
  };

  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      {/* New License Form */}
      <Modal opened={opened} onClose={close} title="New License">
        <NewLicenseForm formData={licenseForm} handleChange={handleChange} handleSubmit={onSubmitForm} today={today}/>
      </Modal>
      {/* End of New License Form */}
      <div>
        <div className="flex justify-between">
        <h1 className="main-heading text-4xl font-bold">License Management</h1>
          <div className="title-and-number flex rounded bg-green-600 items-center p-1.5 cursor-pointer" onClick={open}>
            <MdNoteAdd size={24} color="white"/>
            <h1 className="text-2xl font-bold text-white">New License</h1>
          </div>
        </div>
      </div>
      <Paper sx={{ width: "80%", overflow: "auto" }} className="mt-7">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell className="font-bold text-md uppercase">
                  License
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Purchase Date
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Expiry Date
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Valid For
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  No of Users
                </StyledTableCell>
                <StyledTableCell className="font-bold text-md uppercase">
                  Actions
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {licenses &&
                licenses.map((license) => (
                  <StyledTableRow
                    key={license.license_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="font-bold text-md"
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="font-bold text-md"
                    >
                      {license.license_name}
                    </StyledTableCell>
                    <StyledTableCell className="font-bold text-md">
                      {license.purchase_date}
                    </StyledTableCell>
                    <StyledTableCell className="font-bold text-md">
                      {license.expiry_date}
                    </StyledTableCell>
                    {Math.floor(
                      (new Date(license.expiry_date) - new Date()) / 86400000
                    ) < 0 ? (
                      <StyledTableCell className="font-bold text-md uppercase text-red-600 bg-red-100">
                        Expired
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell className="font-bold text-md uppercase text-green-500">
                        {Math.floor(
                          (new Date(license.expiry_date) - new Date()) /
                            86400000
                        )}{" "}
                        days
                      </StyledTableCell>
                    )}
                    <StyledTableCell className="font-bold text-md text-center">
                      {license.number_of_users}
                    </StyledTableCell>
                    <StyledTableCell className="font-bold text-md">
                      <Button.Group className="gap-1">
                        <Tooltip
                          title="View License Details"
                          placement="top"
                          arrow
                          className="cursor-pointer"
                        >
                          <IconEye
                            size="1.5rem"
                            color="white"
                            className="bg-amber-600 rounded"
                          />
                        </Tooltip>
                        <Tooltip
                          title="Edit License Details"
                          placement="top"
                          arrow
                          className="cursor-pointer"
                        >
                          <IconEdit
                            size="1.5rem"
                            color="white"
                            className="bg-blue-600 rounded"
                          />
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
  );
}
