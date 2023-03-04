import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {useNavigate} from 'react-router-dom';

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack } from "@mui/material/";
import { IconButton } from "@mui/material/";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  FilledInput,
  TextField,
} from "@mui/material/";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

import GlobalBlueContainedButton from "../../global/buttons/contains/BlueContainedButton";
import GlobalWhiteContainedButton from "../../global/buttons/contains/WhiteContainedButton";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import GlobalPurpleHeader2 from "../../global/typographies/headers/PurpleHeader2";
import GlobalWhiteHeader2 from "../../global/typographies/headers/WhiteHeader2";
import GlobalWhiteHeader6 from "../../global/typographies/headers/WhiteHeader6";

function SignIn() {
    const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            navigate('/');
        }   
    });

  const fullScreenDisplay = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
  };

  const centerAlignment = {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100vh",
  };

  const signInContainer = {
    height: { xs: "50vh", sm: "50vh", md: "100vh", lg: "100vh", lx: "100vh" },
    backgroundColor: "#FFFFFF",
  };

  const signUpContainer = {
    backgroundColor: "#506AD8D9",
    height: { xs: "50vh", sm: "50vh", md: "100vh", lg: "100vh", lx: "100vh" },
  };

  return (
    <React.Fragment>
      <Grid2 container sx={[fullScreenDisplay, centerAlignment]}>
        <Grid2
          item
          sx={[signInContainer, centerAlignment]}
          xs={12}
          sm={12}
          md={8}
          lg={8}
          lx={8}
        >
          <Stack component="form" spacing={5}>
            <Stack>
              <GlobalPurpleHeader2 text="Login your Account" />
              <GlobalBlackHeader5 text="to start manage your data" />
            </Stack>
            <Stack spacing={3}>
              <Box>
                <TextField
                  id="outlined-textarea"
                  color="primary"
                  type="email"
                  label="Email"
                  placeholder="Enter your Email"
                  variant="filled"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    color="primary"
                    placeholder="Enter your password"
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Box>
              {error && <div>{error.message}</div>}
              <Box>
                <GlobalBlueContainedButton
                  text="Sign In"
                  onClick={handleSignIn}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2
          item
          sx={[signUpContainer, centerAlignment]}
          xs={12}
          sm={12}
          md={4}
          lg={4}
          lx={4}
        >
          <Stack component="form" spacing={5}>
            <Stack>
              <GlobalWhiteHeader2 text="No Account?" />
              <GlobalWhiteHeader6 text="Sign up to create account" />
            </Stack>
            <Stack>
              <Box>
                <GlobalWhiteContainedButton text="Sign Up" />
              </Box>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </React.Fragment>
  );
}

export default SignIn;