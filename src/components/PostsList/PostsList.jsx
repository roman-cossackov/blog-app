import { useSelector } from "react-redux";

import { selectAllPosts } from "../../redux/slices/postsSlice";
import PostAuthor from "../postAuthor/PostAuthor";
import TimeAgo from "../TimeAgo/TimeAgo";
import ReactionButtons from "../ReactionButtons/ReactionButtons";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post}/>
            <button>show more...</button>
        </article>
    ));
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;
