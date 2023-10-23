import { configureStore } from "@reduxjs/toolkit";

import postsSlice from "../features/posts/postsSlice";
import usersSlice from "../features/users/usersSlice";
import commentsSlice from "../features/comments/commentsSlice";

const store = configureStore({
    reducer: {
        posts: postsSlice,
        users: usersSlice,
        comments: commentsSlice,
    },
});

export default store;
