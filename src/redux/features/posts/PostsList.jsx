import { useSelector } from "react-redux";

import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostExcerpt";

const PostsList = () => {
    const orderedPostsIds = useSelector(selectPostIds);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        content = orderedPostsIds.map((postId) => (
            <PostsExcerpt key={postId} postId={postId} />
        ));
    } else if (postsStatus === "failed") {
        content = { postsError };
    }

    return <section>{content}</section>;
};

export default PostsList;
