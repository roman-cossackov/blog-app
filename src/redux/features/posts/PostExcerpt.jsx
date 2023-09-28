import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import styles from './PostExcerpt.module.css'


const PostExcerpt = (props) => {
    return (
        <article className={styles.post}>
            <h2>{props.post.title}</h2>
            <p>{props.post.body.substring(0, 75)}...</p>
            <p>
                <Link to={`posts/${props.post.id}`}>View Post</Link>
                <PostAuthor userId={props.post.userId} />
                <TimeAgo timestamp={props.post.date} />
            </p>
            <ReactionButtons post={props.post} />
        </article>
    );
};

export default PostExcerpt;
