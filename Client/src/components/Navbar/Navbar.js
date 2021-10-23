import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';

import useStyles from './styles';
import memories from "../../images/memories.png";

const Navbar = () => {

    const classes = useStyles();

    const user = null;

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer} >
                <img className={classes.image} src={memories} alt="Memories" height='60' />
                <Typography className={classes.heading}  component={Link} to='/' varient="h2" align='center'>Memory Root</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.result.imageUrl} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} varient='h6'>{user.result.name}</Typography>
                        <Button varient='container' color='secondary'>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' varient='container' color='primary'>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
