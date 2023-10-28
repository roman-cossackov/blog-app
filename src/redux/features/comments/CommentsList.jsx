import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import TimeAgo from "../posts/TimeAgo";
import styles from "../../../css/CommentsList.module.css";

import {
    getCommentsError,
    getCommentsStatus,
    selectCommentsByPost,
} from "./commentsSlice";
import AddCommentForm from "../comments/AddCommentForm";

const CommentsList = (props) => {
    const commentsStatus = useSelector(getCommentsStatus);
    const commentsError = useSelector(getCommentsError);

    const commentsForPost = useSelector((state) =>
        selectCommentsByPost(state, Number(props.postId))
    );

    let content;
    if (commentsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (commentsStatus === "succeeded") {
        content = (
            <ul className={styles.comments}>
                {commentsForPost.map((comment) => (
                    <li className={styles.comment} key={comment.id}>
                        <p className={styles.author}>{comment.name}</p>
                        <p className={styles.body}>{comment.body}</p>
                        <div className={styles.time}>
                            <TimeAgo timestamp={comment.date} />
                        </div>
                        <div className={styles.edit_wrapper}>
                            <Link
                                className={styles.edit}
                                to={`edit_comment/${comment.id}`}
                            >
                                Edit comment
                            </Link>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        );
    } else if (commentsStatus === "failed") {
        content = { commentsError };
    }
    return (
        <section>
            {content}
            <AddCommentForm postId={props.postId} />
        </section>
    );
};

export default CommentsList;
