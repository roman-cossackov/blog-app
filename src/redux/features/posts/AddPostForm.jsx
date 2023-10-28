import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import styles from '../../../css/AddPostForm.module.css'

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canSave =
        [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const onSavePostHandler = () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate('/')
            } catch (err) {
                console.log("Failed to save the post", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.header}>Add a New Post</h2>
            <form className={styles.form}>
                <label htmlFor="postTitle" className={styles.label}>Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className={styles.input}
                />
                <label htmlFor="postAuthor" className={styles.label}>Author:</label>
                <select
                    name="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                    className={styles.select}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent" className={styles.label}>Post Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    className={styles.textarea}
                />

                <button
                    type="button"
                    onClick={onSavePostHandler}
                    disabled={!canSave}
                    className={styles.button}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
