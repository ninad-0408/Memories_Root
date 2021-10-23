import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grow, Grid, Container } from '@material-ui/core';

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { getPosts } from '../../actions/posts';

const Home = () => {
    
    const dispatch = useDispatch();
    const [currentId, setcurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setcurrentId={setcurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setcurrentId={setcurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;
