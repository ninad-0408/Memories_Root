import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar } from "@material-ui/core";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbUPAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertOutlined from "@material-ui/icons/MoreVertOutlined";
import moment from "moment";

import useStyles from "./styles";

const Post = ({ post, setcurrentId }) => {

    const dispatch = useDispatch();

    const classes = useStyles();
    console.log(post);

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Avatar className={classes.purple} src={post.creator.imageUrl} alt={post.creator.name}>{post.creator.name.charAt(0)}</Avatar>
                <Typography variant="h6">{post.creator.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: "white" }} size="small" onClick={() => setcurrentId(post._id)} >
                    <MoreVertOutlined fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent> 
                <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={(() => dispatch(likePost(post._id)))}> 
                    <ThumbUPAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
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