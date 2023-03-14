import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, IconButton, Tooltip } from '@mui/material/';
import { FormControl, InputAdornment, InputLabel, FilledInput, TextField } from '@mui/material/';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { teal } from '@mui/material/colors';

import GlobalTealContainedButton from '../../global/buttons/contains/TealContainedButton';
import GlobalWhiteContainedButton from '../../global/buttons/contains/WhiteContainedButton';
import GlobalBlackHeader5 from '../../global/typographies/headers/BlackHeader5';
import GlobalIndigoHeader2 from '../../global/typographies/headers/IndigoHeader2';
import GlobalWhiteHeader2 from '../../global/typographies/headers/WhiteHeader2';
import GlobalWhiteHeader6 from '../../global/typographies/headers/WhiteHeader6';
import GlobalBlackHeader6 from '../../global/typographies/headers/BlackHeader6';
import GlobalTealHeader6 from '../../global/typographies/headers/TealHeader6';
import FadeIn from '../../animation/FadeIn';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
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
        setEmail('');
        setPassword('');
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
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    display: 'flex',
  };

  const centerAlignment = {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
  };

  const signInContainer = {
    height: { xs: '50vh', sm: '50vh', md: '100vh', lg: '100vh', lx: '100vh' },
    backgroundColor: '#FFFFFF',
  };

  const signUpContainer = {
    backgroundColor: teal[500],
    height: { xs: '50vh', sm: '50vh', md: '100vh', lg: '100vh', lx: '100vh' },
  };

  const centerTypography = {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  };

  const hyperLink = {
    cursor: 'pointer'
  }

  return (
    <FadeIn>
      <Grid2 container sx={[fullScreenDisplay, centerAlignment]}>
        <Grid2 item sx={[signInContainer, centerAlignment]} xs={12} sm={12} md={8} lg={8} lx={8} >
          <Stack component='form' spacing={5}>
            <Stack>
              <GlobalIndigoHeader2 text={ `Login your Account` } />
              <GlobalBlackHeader5 text={ `to start manage your data` } />
            </Stack>
            <Stack spacing={3}>
              <Box>
                <TextField id='outlined-textarea' color='warning' type='email' label='Email' placeholder='Enter your Email' variant='filled' fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Box>
              <Box>
                <FormControl variant='filled' fullWidth>
                  <InputLabel color='warning' htmlFor='filled-adornment-password'>
                    Password
                  </InputLabel>
                  <FilledInput color='warning' placeholder='Enter your password' id='filled-adornment-password' type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <Tooltip title={showPassword ? 'Hide Password' : 'Show Password'}>
                          <IconButton aria-label='toggle password visibility' onClick={ handleClickShowPassword } onMouseDown={ handleMouseDownPassword } edge='end' >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Box>
              {error && <div>{error.message}</div>}
              <Box>
                <GlobalTealContainedButton text={ `Sign In` } onClick={handleSignIn} />
              </Box>
              <Grid2 sx={centerTypography} spacing={1} container>
                <Grid2 item>
                  <Box>
                    <GlobalBlackHeader6 text='Forgot Password?' />
                  </Box>
                </Grid2>
                <Grid2 item>
                  <Box onClick={() => navigate('/forgotpassword')} sx={ hyperLink }>
                    <GlobalTealHeader6 text={ `Click Here` } />
                  </Box>
                </Grid2>
              </Grid2>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 item sx={[signUpContainer, centerAlignment]} xs={12} sm={12} md={4} lg={4} lx={4}>
          <Stack component='form' spacing={5}>
            <Stack>
              <GlobalWhiteHeader2 text={ `No Account?` } />
              <GlobalWhiteHeader6 text={ `Sign up to create account` } />
            </Stack>
            <Stack>
              <Box>
                <GlobalWhiteContainedButton text={ `Sign Up` } onClick={() => navigate('/signup')} />
              </Box>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </FadeIn>
  );
}

export default SignIn;