import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleButton from 'react-google-button'
import { signGoogle } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleGoogleSignIn = async () => {
        try {
            await signGoogle();
            navigate('/');
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="page"
      >
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/images/orchidlogin.jpg)',
                         

                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
 
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                    <Box
                        sx={{
                            boxShadow: 'white',
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src="/images/flower.png"
                            width="80"
                            height="80"
                            alt="."
                        />
                        <Typography component="h1" variant="h5" sx={{
                            fontFamily: "'Henny Penny', -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: 400,
                            fontSize: '28px',
                            lineHeight: '150%',
                            mt: 1
                        }}>
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                            color="secondary"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                
                            />
                            <TextField
                            color="secondary"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                            color="success"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 5 }}
                            >
                                Sign In
                            </Button>

                            <GoogleButton
                                onClick={handleGoogleSignIn}
                            />


                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
        </CSSTransition>
    );
}