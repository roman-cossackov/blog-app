import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import styles from "./PostExcerpt.module.css";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = (props) => {
    const post = useSelector((state) => selectPostById(state, props.postId));

    return (
        <article className={styles.post}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 75)}...</p>
            <p>
                <Link to={`posts/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default PostsExcerpt;
