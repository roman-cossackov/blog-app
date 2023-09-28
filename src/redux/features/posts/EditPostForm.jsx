import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
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
    const onAuthorChanged = (e) => setUserId(e.target.value);

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
        <section>
            <h2>Edit Posts</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    defaultValue={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent"></label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostHandler}
                    disabled={!canSave}
                >
                    Save
                </button>
                <button type="button" onClick={onDeletePostHandler}>
                    Delete
                </button>
            </form>
        </section>
    );
};

export default EditPostForm;
