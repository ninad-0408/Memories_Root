import React, { useState }  from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, autoFocus, half, label, type, handleChange, handleShowPassword }) => {

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                autoFocus={autoFocus}
                label={label}
                type={type}
                variant='outlined'
                fullWidth
                required
                InputProps={(name === 'confirmPassword' || name === 'password') && {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type==='password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    )
};

export default Input;
