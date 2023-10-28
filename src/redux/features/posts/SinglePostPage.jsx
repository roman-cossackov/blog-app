import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams, Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import CommentsList from "../comments/CommentsList";
import styles from "../../../css/SinglePostPage.module.css";

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article className={styles.post}>
            <div className={styles.wrapper}>
                <h3 className={styles.header}>{post.title}</h3>
                <p className={styles.content}>{post.body}</p>
                <p>
                    <PostAuthor
                        className={styles.author}
                        userId={post.userId}
                    />
                    <TimeAgo className={styles.time} timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
                <div className={styles.edit_wrapper}>
                    <Link className={styles.edit} to={`/posts/edit/${post.id}`}>
                        Edit Post
                    </Link>
                </div>
            </div>
            <CommentsList postId={post.id} />
        </article>
    );
};

export default SinglePostPage;
