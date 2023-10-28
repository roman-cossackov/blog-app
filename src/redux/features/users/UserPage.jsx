import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useParams } from "react-router-dom";

import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import styles from "../../../css/UserPage.module.css";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, Number(userId)));

    const postsForUser = useSelector((state) =>
        selectPostsByUser(state, Number(userId))
    );

    const postTitles = postsForUser.map((post) => (
        <li className={styles.item} key={post.id}>
            <Link className={styles.link} to={`/posts/${post.id}`}>
                {post.title}
            </Link>
        </li>
    ));

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.header}>{user?.name}</h2>

            <ol className={styles.list}>{postTitles}</ol>
        </section>
    );
};

export default UserPage;
