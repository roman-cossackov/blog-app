import { useDispatch } from "react-redux";
import { postAdded, reactionAdded } from "../../redux/slices/postsSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😯",
    heart: "💖",
    rocket: "🚀",
    coffee: "☕",
};

const ReactionButtons = (props) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    onClick={() =>
                        dispatch(
                            reactionAdded({
                                postId: props.post.id,
                                reaction: name,
                            })
                        )
                    }
                >
                    {emoji} {props.post.reactions[name]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
