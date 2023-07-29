"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function LicensePage() {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    const fetchLicenses = async () => {
      const response = await fetch("http://127.0.0.1:4000/licenses");
      const data = await response.json();
      setLicenses(data);
    };
    fetchLicenses();
  }, []);

  return (
    <>
      <h1 className="main-heading text-4xl font-bold">License Management</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>License</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>No of Users</TableCell>
              <TableCell>Valid For</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenses && licenses.map((license) => (
              <TableRow
                key={license.license_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {license.license_name}
                </TableCell>
                <TableCell>{license.purchase_date}</TableCell>
                <TableCell>{license.expiry_date}</TableCell>
                <TableCell>{license.number_of_users}</TableCell>
                {(Math.floor((new Date(license.expiry_date) - new Date()) / 86400000)) < 0 ? <TableCell>Expired</TableCell> : <TableCell>{Math.floor((new Date(license.expiry_date) - new Date()) / 86400000)} days</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
