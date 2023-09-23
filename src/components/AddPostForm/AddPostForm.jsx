import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "../../redux/slices/postsSlice";
import { selectAllusers } from "../../redux/slices/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllusers);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const onSavePostHandler = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId));
            setTitle("");
            setContent("");
        }
    };
1
    const canSave = title && content && userId;

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a New Post</h2>
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
                    name="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Post Content:</label>
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
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
