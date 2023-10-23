import PostsList from "./redux/features/posts/PostsList";
import AddPostForm from "./redux/features/posts/AddPostForm";
import SinglePostPage from "./redux/features/posts/SinglePostPage";
import EditPostForm from "./redux/features/posts/EditPostForm";
import EditCommentForm from "./redux/features/comments/EditCommentForm";
import UsersList from "./redux/features/users/UsersList";
import UserPage from "./redux/features/users/UserPage";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path="posts">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                    <Route
                        path=":postId/edit_comment/:commentId"
                        element={<EditCommentForm />}
                    ></Route>
                </Route>

                <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UserPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
