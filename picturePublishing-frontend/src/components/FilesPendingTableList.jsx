import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RESTServices from "../services/RESTServices";
import TableList from "./TableList";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom"; 
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const FilesPendingTableList = () => {
  const navigate = useNavigate();
  let { userName } = useParams();
  const [files, setFiles] = useState([]);
  const [fileDetail, setFileDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  useEffect(() => {
    RESTServices.getFiles(setFiles, userName, null);
  }, []);

  const columns = [
    { key: 1, value: "FILE NAME" },
    { key: 2, value: "STATUS" },
    { key: 3, value: "CATEGORY" },
  ];

  const onBack = () => {
    showDetail ? setShowDetail(false) : navigate("/");
  };

  const onViewDetail = (row) => {
    setFileDetail(row);
    setShowDetail(true);
  };

  const onAcceptFile = () => {
    RESTServices.acceptFile({
      fileDetail,
      userName,
      setShowDetail,
      setFiles,
      setShowAlert,
      setShowAlertMessage,
    });
  };

  const onRejectFile = () => {
    RESTServices.rejectFile({
      fileDetail,
      userName,
      setShowDetail,
      setFiles,
      setShowAlert,
      setShowAlertMessage,
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {showAlertMessage}
        </Alert>
      </Snackbar>

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
        {!showDetail ? "Files uploaded - Pending" : "File Detail"}
      </Typography>
      {!showDetail ? (
        <TableList rows={files} columns={columns} onViewDetail={onViewDetail} />
      ) : (
        <Paper style={{ marginTop: "5rem" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={5} marginBottom={5}>
              <Grid container item spacing={3}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {"File Name:"}
                    </Typography>
                    <Typography>{fileDetail.fileName}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {"File Size:"}
                    </Typography>
                    <Typography>{fileDetail.fileSize}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {"Category:"}
                    </Typography>
                    <Typography>{fileDetail.category}</Typography>
                  </Grid>
                </React.Fragment>
              </Grid>
              <Grid container item spacing={3}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {"Description:"}
                    </Typography>
                    <Typography>{fileDetail.description}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {"File Type:"}
                    </Typography>
                    <Typography>{fileDetail.fileType}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {"Status:"}
                    </Typography>
                    <Typography>{fileDetail.status}</Typography>
                  </Grid>
                </React.Fragment>
              </Grid>
            </Grid>
          </Box>
          <div
            style={{
              maxHeight: "30rem",
              maxWidth: "30rem",
              margin: "auto",
              borderColor: "#19ceac",
              borderStyle: "outset",
            }}
          >
            <img
              style={{ maxHeight: "30rem", maxWidth: "30rem" }}
              src={`${fileDetail.fileUrl}${fileDetail.id}/${fileDetail.fileName}`}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              style={{ margin: "4rem" }}
              onClick={onAcceptFile}
            >
              ACCEPT
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<CancelIcon />}
              style={{ margin: "4rem" }}
              onClick={onRejectFile}
            >
              REJECT
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default FilesPendingTableList;
