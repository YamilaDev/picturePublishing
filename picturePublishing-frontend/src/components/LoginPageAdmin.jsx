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

const LoginPageAdmin = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    RESTServices.loginByUserName({ ...values, navigate });
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
        Welcome to Picture publishing - Admin{" "}
      </Typography>

      <Paper>
        <Grid container spacing={3} direction={"column"} alignItems={"center"}>
          <Formik
            initialValues={{ userName: "", password: "" }}
            validationSchema={Yup.object().shape({
              userName: Yup.string().required("This field is mandatory"),
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid item xs={12} margin={1}>
                  <TextField
                    type="userName"
                    name="userName"
                    placeholder="UserName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                  />
                  <Typography color={"red"}>
                    {errors.userName && touched.userName && errors.userName}
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
                    variant="contained"
                    color="success"
                  >
                    {" "}
                    Login{" "}
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

export default LoginPageAdmin;
