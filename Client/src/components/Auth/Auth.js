import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Input from './Input';

import useStyles from './styles';

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setshowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false)

    const handleShowPassword = () => setshowPassword((e) => !e);
    const switchMode = () => { setshowPassword(false); setisSignup((e) => !e); };

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    return (
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Login'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' type='text' half handleChange={handleChange} autoFocus />
                                <Input name='lastName' label='Last Name' type='text' half handleChange={handleChange} />
                            </>
                        )}

                        <Input name='email' label='Email Address' type='email' handleChange={handleChange} />
                        <Input name='password' label='Password' type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} handleChange={handleChange} />

                        {isSignup && (
                            <>
                                <Input name='confirmPassword' label='Confirm Password' type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} handleChange={handleChange} />
                            </>
                        )}
                    </Grid>
                    <Button type='submit' color='primary' variant='contained' className={classes.submit} fullWidth>
                        {isSignup ? 'Sign up' : 'Login'}
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button color='secondary' onClick={switchMode}>
                                {!isSignup ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;
