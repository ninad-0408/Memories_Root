import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import { deletePost } from "../../../actions/posts";
import ThumbUPAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertOutlined from "@material-ui/icons/MoreVertOutlined";
import moment from "moment";

import useStyles from "./styles";

const Post = ({ post, setcurrentId }) => {

    const dispatch = useDispatch();

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: "white"}} size="small" onClick={() => setcurrentId(post._id)} >
                    <MoreVertOutlined fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="h5" gutterBottom>{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={(() => {})}>
                    <ThumbUPAltIcon fontSize="small" />
                    Like
                    {` ${post.likeCount}`}
                </Button>
                <Button size="small" color="secondary" onClick={(() => dispatch(deletePost(post._id)))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;