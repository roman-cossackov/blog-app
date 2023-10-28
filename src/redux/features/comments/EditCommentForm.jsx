import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
    selectCommentById,
    updateComment,
    deleteComment,
} from "./commentsSlice";
import styles from "../../../css/EditCommentForm.module.css";

const EditCommentForm = () => {
    const { commentId } = useParams();
    const navigate = useNavigate();

    const comment = useSelector((state) =>
        selectCommentById(state, Number(commentId))
    );

    const [title, setTitle] = useState(comment.name);
    const [content, setContent] = useState(comment.body);
    const [requestStatus, setRequestStatus] = useState("idle");

    const dispatch = useDispatch();

    if (!comment) {
        return (
            <section>
                <h2>Comment not found!</h2>
            </section>
        );
    }

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const canSave = [title, content].every(Boolean) && requestStatus === "idle";

    const onSaveCommentHandler = () => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(
                    updateComment({
                        postId: comment.postId,
                        id: comment.id,
                        name: title,
                        body: content,
                        reactions: comment.reactions,
                    })
                ).unwrap();

                setTitle("");
                setContent("");
                navigate(`/posts/${comment.postId}`);
            } catch (err) {
                return console.error("Failed to save comment", err);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const onDeleteCommentHandler = () => {
        try {
            setRequestStatus("pending");
            dispatch(deleteComment({ id: comment.id }));

            setTitle("");
            setContent("");
            navigate(`/posts/${comment.postId}`);
        } catch (err) {
            console.error("Failed to delete the comment", err);
        } finally {
            setRequestStatus("idle");
        }
    };

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.header}>Edit Comment</h2>
            <form className={styles.form}>
                <label className={styles.label} htmlFor="commentTitle">
                    Comment Title:
                </label>
                <input
                    className={styles.input}
                    type="text"
                    id="commentTitle"
                    name="commentTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label
                    className={styles.label}
                    htmlFor="commentContent"
                ></label>
                <textarea
                    className={styles.textarea}
                    id="commentContent"
                    name="commentContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    className={styles.button}
                    type="button"
                    onClick={onSaveCommentHandler}
                    disabled={!canSave}
                >
                    Save
                </button>
                <button
                    className={`${styles.button} ${styles.delete}`}
                    type="button"
                    onClick={onDeleteCommentHandler}
                >
                    Delete
                </button>
            </form>
        </section>
    );
};

export default EditCommentForm;
