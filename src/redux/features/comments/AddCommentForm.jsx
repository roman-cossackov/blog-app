import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "./commentsSlice";

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
                dispatch(addComment({ name, body: content, postId: props.postId })).unwrap();

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
        <form>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onNameChanged}
            />
            <label htmlFor="comment">Content:</label>
            <textarea
                id="comment"
                name="comment"
                value={content}
                onChange={onContentChanged}
            />
            <button type="button" onClick={onSaveCommentHandler} disabled={!canSave}>
                Save Comment
            </button>
        </form>
    );
};

export default AddCommentForm;
