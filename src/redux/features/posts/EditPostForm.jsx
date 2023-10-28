import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import styles from '../../../css/EditPostForm.module.css'

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.body);
    const [userId, setUserId] = useState(post.userId);
    const [requestStatus, setRequestStatus] = useState("idle");

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(Number(e.target.value));

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === "idle";

    const onSavePostHandler = () => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate(`/posts/${postId}`);
            } catch (err) {
                return console.error("Failed to save post", err);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const onDeletePostHandler = () => {
        try {
            setRequestStatus("pending");
            dispatch(deletePost({ id: post.id}))

            setTitle("");
            setContent("");
            setUserId("");
            navigate("/");
        } catch (err) {
            console.error("Failed to delete the post", err);
        } finally {
            setRequestStatus("idle");
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.header}>Edit Post</h2>
            <form className={styles.form}>
                <label className={styles.label} htmlFor="postTitle">Post Title:</label>
                <input
                    className={styles.label}
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label className={styles.label} htmlFor="postAuthor">Author:</label>
                <select
                    className={styles.select}
                    id="postAuthor"
                    defaultValue={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label className={styles.label} htmlFor="postContent"></label>
                <textarea
                    className={styles.textarea}
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    className={styles.button}
                    type="button"
                    onClick={onSavePostHandler}
                    disabled={!canSave}
                >
                    Save
                </button>
                <button className={`${styles.button} ${styles.delete}`} type="button" onClick={onDeletePostHandler}>
                    Delete
                </button>
            </form>
        </section>
    );
};

export default EditPostForm;
