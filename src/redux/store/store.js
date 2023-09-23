import { configureStore } from "@reduxjs/toolkit";

import postsSlice from "../slices/postsSlice";
import usersSlice from "../slices/usersSlice";

const store = configureStore({
    reducer: {
        posts: postsSlice,
        users: usersSlice,
    },
});

export default store;
