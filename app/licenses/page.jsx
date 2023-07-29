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

  return (
    <>
      <h1 className="main-heading text-4xl font-bold">License Management</h1>
      <Paper sx={{ width: '75%', overflow: "auto" }} className="mt-7">
        <TableContainer >
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
                    <StyledTableCell className="font-bold text-md">
                      {license.number_of_users}
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
