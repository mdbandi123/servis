import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack, Tooltip } from "@mui/material/";
import { IconButton } from "@mui/material/";
import {
    FormControl,
    InputAdornment,
    InputLabel,
    FilledInput,
    TextField,
} from "@mui/material/";
import { teal } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

import GlobalTealContainedButton from "../../global/buttons/contains/TealContainedButton";
import GlobalBlackHeader6 from "../../global/typographies/headers/BlackHeader6";
import GlobalTealHeader6 from "../../global/typographies/headers/TealHeader6";
import GlobalIndigoHeader2 from "../../global/typographies/headers/IndigoHeader2";
import FadeIn from "../../animation/FadeIn";

import firebase from "firebase/app";
import "firebase/auth";

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            // handle error
            return;
        }

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            // handle success
        } catch (error) {
            // handle error
        }
    };

    const fullScreenDisplay = {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: teal[500],
    };

    const centerAlignment = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100vh",
    };

    const registrationFormContainer = {
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: {
            xs: "80vh",
            sm: "80vh",
            md: "100vh",
            lg: "100vh",
            lx: "100vh",
        },
    };

    const centerTypography = {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    };

    const hyperLink = {
        cursor: "pointer",
    };

    return (
        <FadeIn>
            <Grid2 sx={[fullScreenDisplay, centerAlignment]} container>
                <Grid2
                    sx={[registrationFormContainer]}
                    xs={12}
                    sm={12}
                    md={8}
                    lg={8}
                    lx={8}
                    item
                >
                    <Stack component="form" spacing={3}>
                        <Stack>
                            <GlobalIndigoHeader2 text="Create your Account" />
                        </Stack>
                        <Stack spacing={2}>
                            <Box>
                                <TextField
                                    id="outlined-textarea"
                                    color="warning"
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
                                    <InputLabel
                                        color="warning"
                                        htmlFor="filled-adornment-password"
                                    >
                                        Password
                                    </InputLabel>
                                    <FilledInput
                                        color="warning"
                                        placeholder="Enter your password"
                                        id="filled-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Tooltip
                                                    title={
                                                        showPassword
                                                            ? "Hide Password"
                                                            : "Show Password"
                                                    }
                                                >
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel
                                        color="warning"
                                        htmlFor="filled-adornment-password"
                                    >
                                        Confirm Password
                                    </InputLabel>
                                    <FilledInput
                                        color="warning"
                                        placeholder="Confirm your password"
                                        id="filled-adornment-password"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Tooltip
                                                    title={
                                                        showPassword
                                                            ? "Hide Password"
                                                            : "Show Password"
                                                    }
                                                >
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowConfirmPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <GlobalTealContainedButton
                                    text="Sign Up"
                                    onClick={() =>
                                        handleSignUp(email, password)
                                    }
                                />
                            </Box>
                            <Grid2 sx={centerTypography} spacing={1} container>
                                <Grid2 item>
                                    <Box>
                                        <GlobalBlackHeader6 text="Have already an Account?" />
                                    </Box>
                                </Grid2>
                                <Grid2 item>
                                    <Box
                                        onClick={() => navigate("/login")}
                                        sx={hyperLink}
                                    >
                                        <GlobalTealHeader6 text={`Sign In`} />
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Stack>
                    </Stack>
                </Grid2>
            </Grid2>
        </FadeIn>
    );
}

export default SignUp;
