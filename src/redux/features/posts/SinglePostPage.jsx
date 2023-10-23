import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { useParams, Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import CommentsList from "../comments/CommentsList";

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>
                <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
            <button>show comments...</button>
            <CommentsList postId={post.id}/>
        </article>
    );
};

export default SinglePostPage;
