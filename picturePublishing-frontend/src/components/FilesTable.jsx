import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RESTServices from "../services/RESTServices";
import TableList from "./TableList";
import { useParams } from "react-router-dom";

const FilesTable = () => {  

  const [files, setFiles] = useState([]);
  let { userName, email } = useParams();  
  const navigate = useNavigate();

  useEffect(() => {
    RESTServices.getFiles(setFiles, userName, email);
  }, []);
 
  const columns = [
    { key: 1, value: "FILE NAME" },
    { key: 2, value: "STATUS" },
    { key: 3, value: "CATEGORY" },
    { key: 4, value: "URL" },
  ];

  const onBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: 30 }}>
      <Button
        sx={{ float: "left" }}
        variant="contained"
        color="success"
        onClick={onBack}
      >
        {" "}
        Back{" "}
      </Button>
      <Typography align="center" variant="h5" marginTop="3rem">
        {"Files uploaded"}
      </Typography>
      <TableList rows={files} columns={columns} />
    </div>
  );
};

export default FilesTable;
