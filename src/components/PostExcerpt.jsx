import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostExcerpt = (props) => {
    return (
        <article>
            <h3>{props.post.title}</h3>
            <p>{props.post.body.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={props.post.userId} />
                <TimeAgo timestamp={props.post.date} />
            </p>
            <ReactionButtons post={props.post} />
            <button>show more...</button>
            <button>show comments...</button>
        </article>
    );
};

export default PostExcerpt;
