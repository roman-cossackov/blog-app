import { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "./commentsSlice";
import styles from "../../../css/AddCommentForm.module.css";

const AddCommentForm = (props) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const onNameChanged = (e) => setName(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);

    const canSave =
        [name, content].every(Boolean) && addRequestStatus === "idle";

    const onSaveCommentHandler = () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(
                    addComment({ name, body: content, postId: props.postId })
                ).unwrap();

                setName("");
                setContent("");
            } catch (err) {
                console.log("Failed to save post", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    return (
        <section>
            <form>
                <textarea
                    className={styles.content}
                    placeholder="Write a comment.."
                    id="comment"
                    name="comment"
                    value={content}
                    onChange={onContentChanged}
                />
                <input
                    className={styles.name}
                    placeholder="Your name"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onNameChanged}
                />
                <button
                    type="button"
                    onClick={onSaveCommentHandler}
                    disabled={!canSave}
                >
                    Save Comment
                </button>
            </form>
        </section>
    );
};

export default AddCommentForm;
