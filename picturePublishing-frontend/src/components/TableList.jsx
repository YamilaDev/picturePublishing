import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system"; 
import { Button, Typography } from "@mui/material";

const StyledTableContainer = styled(TableContainer)(() => ({
  marginTop: "2rem",
}));

const TableList = ({ rows, columns, onViewDetail }) => {
  const noDataLabel = "No Data";

  const viewFileDetail = (row) => {
    onViewDetail(row);
  };

  return (
    <>
      {rows.length > 0 ? (
        <StyledTableContainer>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#b7c8b7" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key} align="left">
                    {column.value}
                  </TableCell>
                ))}{" "}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "white" }}>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">
                    {row.fileName ? row.fileName : noDataLabel}
                  </TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        borderRadius: "5px",
                        width: "150px",
                        backgroundColor:
                          row.status === "PENDING"
                            ? "#d0ece1"
                            : row.status === "ACCEPTED"
                            ? "#42e742"
                            : "orange",
                      }}
                    >
                      {row.status}
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    {row.category ? row.category : noDataLabel}
                  </TableCell>

                  {row.fileUrl && row.status !== "PENDING" && (
                    <TableCell align="left">
                      <a
                        href={`${row.fileUrl}${row.id}/${row.fileName}`}
                      >{`${row.fileUrl}${row.id}/${row.fileName}`}</a>
                    </TableCell>
                  )}

                  <TableCell>
                    <TableCell>
                      {row.status === "PENDING" && (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => viewFileDetail(row)}
                        >
                          {" "}
                          View Detail{" "}
                        </Button>
                      )}
                    </TableCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      ) : (
        <Typography align="left" variant="h5" marginTop="3rem">
          {"No Rows"}
        </Typography>
      )}
    </>
  );
};

export default TableList;
