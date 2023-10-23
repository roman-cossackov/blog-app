import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./main.css";
import store from "./redux/store/store.js";
import { Provider } from "react-redux";
import { fetchPosts } from "./redux/features/posts/postsSlice.js";
import { fetchUsers } from "./redux/features/users/usersSlice.js";
import { fetchComments } from "./redux/features/comments/commentsSlice.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
store.dispatch(fetchComments());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>
);
