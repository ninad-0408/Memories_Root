import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/posts";

import useStyles from "./styles";

const Form = ({ currentId, setcurrentId }) => {
    const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId)
        {
            dispatch(updatePost(currentId, postData));
            setcurrentId(null);
        }
        else
        {
            dispatch(createPost(postData));
        }

        clear();
    };

    const clear = () => {
        setcurrentId(null);
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
    };

    return (
        <Paper className={classes.paper} xs={12} md={6} >
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography varient="h6">
                    { currentId ? "Editing" : "Creating"} a Memory
                </Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth multiple={true} value={postData.tags} onChange={(e) => { var tags = e.target.value.split(","); setPostData({ ...postData, tags: tags });}} />

                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        value={postData.selectedFile}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;