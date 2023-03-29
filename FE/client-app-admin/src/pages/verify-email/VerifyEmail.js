import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Stack } from "@mui/material/";
import GlobalGreyContainedButton from "../../global/buttons/contains/GreyContainedButton";
import GlobalTealContainedButton from "../../global/buttons/contains/TealContainedButton";
import GlobalIndigoHeader2 from "../../global/typographies/headers/IndigoHeader2";
import { useNavigate } from "react-router-dom";
import { teal } from "@mui/material/colors";
import FadeIn from "../../animation/FadeIn";
import GlobalBlackHeader5 from "../../global/typographies/headers/BlackHeader5";
import firebase from "firebase/app";

function VerifyEmail() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60);

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

  const verifyEmailContainer = {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: { xs: "80vh", sm: "80vh", md: "100vh", lg: "100vh", lx: "100vh" },
  };

  const backButton = {
    cursor: "pointer",
  };

  const checkEmailVerification = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        navigate("/");
      }
    }
  };

  const resendEmailVerification = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      await user.sendEmailVerification();
      setIsButtonDisabled(true);
      setRemainingTime(60);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkEmailVerification();
      if (remainingTime > 0 && isButtonDisabled) {
        setRemainingTime(remainingTime - 1);
      } else if (remainingTime === 0 && isButtonDisabled) {
        setIsButtonDisabled(false);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, remainingTime, isButtonDisabled]);

  const buttonText = isButtonDisabled
    ? `Resend Verification Email (${remainingTime}s)`
    : "Resend Verification Email";

  return (
    <FadeIn>
      <Grid2 sx={[fullScreenDisplay, centerAlignment]} container>
        <Grid2
          sx={[verifyEmailContainer]}
          xs={12}
          sm={12}
          md={8}
          lg={8}
          lx={8}
          item
        >
          <Stack component="form" spacing={6}>
            <Stack>
              <GlobalIndigoHeader2 text="Verify Email" />
              <GlobalBlackHeader5
                text={`Please check your email for verification link.`}
              />
            </Stack>
            <Stack spacing={2}>
              <Box>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Box onClick={() => navigate("/signup")} sx={backButton}>
                    <GlobalGreyContainedButton text="Back" />
                  </Box>
                  <Box>
                    <GlobalTealContainedButton
                      text={buttonText}
                      onClick={resendEmailVerification}
                      disabled={isButtonDisabled}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </FadeIn>
  );
}

export default VerifyEmail;
