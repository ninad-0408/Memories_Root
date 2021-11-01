import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userLogout } from '../../actions/auth';
import useStyles from './styles';
import memories from "../../images/memories.png";

const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);

    const [user, setuser] = useState(null);

    useEffect(() => {
        setuser(JSON.parse(localStorage.getItem('profile')));
    },[auth]);

    const logout = () => {
        dispatch(userLogout());
        setuser(null);
        history.push('/');
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer} >
                <img className={classes.image} src={memories} alt="Memories" height='60' />
                <Typography className={classes.heading} component={Link} to='/' variant="h2" align='center'>Memory Root</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.result.imageUrl} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button variant='contained' component={Link} to='/auth' color='primary'>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
