import PostsList from "./redux/features/posts/PostsList";
import AddPostForm from "./redux/features/posts/AddPostForm";
import SinglePostPage from "./redux/features/posts/SinglePostPage";
import EditPostForm from "./redux/features/posts/EditPostForm";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path="posts">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
