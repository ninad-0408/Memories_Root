import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from './Input';
import Gicon from './Gicon';
import { auth, login, signup } from '../../actions/auth';

import useStyles from './styles';

const initialState = { firstName: '', lastName: '', password: '', confirmPassword: '' };

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [showPassword, setshowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setformData] = useState(initialState);

    const handleShowPassword = () => setshowPassword((e) => !e);
    const switchMode = () => { setshowPassword(false); setisSignup((e) => !e); };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup)
            dispatch(signup(formData, history));
        else
            dispatch(login(formData, history));

    };

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const googleSuccess = async (res) => {
        const oauthData = res.profileObj;
        const token = res.tokenId;

        try {
            dispatch(auth(oauthData, token, history));
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Unable to login.");
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
                    <GoogleLogin
                        clientId='25003741379-1v51bjjpmf2ck003k17g6jd7e4ffmdba.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Gicon />} fullWidth variant='contained'>
                            {isSignup ? 'Sign up' : 'Login'} with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
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
