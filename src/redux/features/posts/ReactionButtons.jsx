import { useDispatch } from "react-redux";

import { reactionAdded } from "./postsSlice";
import styles from '../../../css/ReactionButtons.module.css'

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
                    className={styles.button}
                >
                    {emoji} {props.post.reactions[name]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
