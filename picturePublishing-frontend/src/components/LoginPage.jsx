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

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    RESTServices.loginByEmail({ ...values, navigate });
  };

  const loginAsAdmin = (values) => {
    navigate("/loginPageAdmin");
  };

  const enterWithoutLogin = () => {
    navigate("/filesTable");
  };

  const registration = () => {
    navigate("/registrationPage");
  };

  return (
    <div style={{ padding: 30 }}>
      <Typography marginBottom={10}>Welcome to Picture publishing </Typography>
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
                    variant="contained"
                    color="success"
                  >
                    {" "}
                    Login{" "}
                  </Button>

                  <Button
                    sx={{ mt: 1 }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onClick={registration}
                  >
                    {" "}
                    Registration{" "}
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Paper>
      <Paper style={{ marginTop: "50px" }}>
        <Button
          sx={{ m: 1, mb: 3 }}
          variant="contained"
          color="success"
          onClick={loginAsAdmin}
        >
          Login as Administrator{" "}
        </Button>
        <Button
          sx={{ m: 1, mb: 3 }}
          variant="outlined"
          color="success"
          onClick={enterWithoutLogin}
        >
          Enter without login{" "}
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;
