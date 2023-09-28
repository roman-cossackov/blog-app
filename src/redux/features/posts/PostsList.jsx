import { useSelector } from "react-redux";

import styles from './PostsList.module.css'

import {
    selectAllPosts,
    getPostsStatus,
    getPostError,
} from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostError);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === "failed") {
        content = { postsError };
    }

    return <section className={styles.content}>{content}</section>;
};

export default PostsList;
