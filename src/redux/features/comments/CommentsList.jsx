import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentsExcerpt from "./CommentsExcerpt";
import {
    getCommentsError,
    getCommentsStatus,
    selectCommentById,
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
        content = commentsForPost.map((comment) => (
            <li key={comment.id}>
                {comment.name}
                <br />
                {comment.body}
                <Link to={`edit_comment/${comment.id}`}>Edit comment</Link>
            </li>
        ));
    } else if (commentsStatus === "failed") {
        content = { commentsError };
    }
    return (
        <section>
            <AddCommentForm postId={props.postId}/>
            {content}
        </section>
    );
};

export default CommentsList;
