import React, { useState, useEffect } from "react";
import RESTServices from "../services/RESTServices";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Alert, Grid, Snackbar, TextField, Typography } from "@mui/material";
import TableList from "./TableList";
import { Formik } from "formik";

const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  let { userName, email } = useParams();

  useEffect(() => {
    RESTServices.getFiles(setFiles, userName, email);
  }, []);

  const columns = [
    { key: 1, value: "FILE NAME" },
    { key: 2, value: "STATUS" },
    { key: 3, value: "CATEGORY" },
    { key: 4, value: "URL" },
  ];
  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const onBack = () => {
    navigate("/");
  };

  const handleSubmit = (values) => {
    RESTServices.uploadFile({
      ...values,
      currentFile,
      setShowAlert,
      setShowAlertMessage,
      setPreviewImage,
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <Button
        sx={{ float: "left" }}
        variant="contained"
        color="success"
        onClick={onBack}
      >
        Back{" "}
      </Button>

      <Typography marginBottom={5} variant="h5">
        Welcome to Picture publishing - Upload Page
      </Typography>
      <Typography marginBottom={10} fontStyle={"italic"}>
        Category images can be only : Living thing, Machine, Nature ○ attachment
        (up to 2 Mb) (jpg, png, gif only)
      </Typography>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {showAlertMessage}
        </Alert>
      </Snackbar>

      <Grid item xs={8} margin={3} marginBottom={5}>
        <Button
          fullWidth
          style={{ maxWidth: "150px" }}
          variant="contained"
          color="success"
          component="label"
          onChange={selectFile}
        >
          Select Image
          <input hidden accept=".png, .jpg, .jpeg, .gif" type="file" />
        </Button>
      </Grid>

      <Formik
        initialValues={{ description: "", category: "" }}
        validationSchema={Yup.object().shape({
          category: Yup.string().required("This field is mandatory"),
          description: Yup.string().required("This field is mandatory"),
        })}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {previewImage && (
              <div>
                <img
                  style={{ maxWidth: "150px" }}
                  id="blha"
                  src={previewImage}
                  alt="your image"
                />

                <Typography margin={1} fontStyle={"italic"}>
                  {currentFile && currentFile.name}
                </Typography>
                <Grid item xs={6} margin={1}>
                  <TextField
                    type="category"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  />
                  <Typography color={"red"}>
                    {errors.category && touched.category && errors.category}{" "}
                  </Typography>
                </Grid>

                <Grid item xs={6} margin={1}>
                  <TextField
                    type="description"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <Typography color={"red"}>
                    {errors.description &&
                      touched.description &&
                      errors.description}{" "}
                  </Typography>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  style={{ maxWidth: "150px", marginTop: "50px" }}
                  color="success"
                >
                  Save
                </Button>
              </div>
            )}
          </form>
        )}
      </Formik>
      <TableList rows={files} columns={columns} />
    </div>
  );
};

export default ImageUpload;
