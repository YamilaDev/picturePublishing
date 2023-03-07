import React from "react";
import {
  Button,
  Typography,
  Paper,
  TextField,
  Grid 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import RESTServices from "../services/RESTServices";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    RESTServices.createUser({ ...values, navigate });
  };

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
        Back{" "}
      </Button>

      <Typography marginBottom={10}>
        Welcome to Picture publishing - Registration
      </Typography>
      <Paper>
        <Grid container spacing={3} direction={"column"} alignItems={"center"}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .required("This field is mandatory")
                .email("Enter a valid email"),
              password: Yup.string().required("This field is mandatory"),
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
              isSubmitting, 
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid item xs={12} margin={1}>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Typography color={"red"}>
                    {errors.email && touched.email && errors.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} margin={1}>
                  <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <Typography color={"red"}>
                    {errors.password && touched.password && errors.password}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} margin={1}>
                  <Button
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="success"
                  >
                    {" "}
                    Register and Login{" "}
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Paper>
    </div>
  );
};

export default RegistrationPage;
