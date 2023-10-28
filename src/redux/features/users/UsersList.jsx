import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

import { selectAllUsers } from "./usersSlice";
import styles from "../../../css/UsersList.module.css";

const UsersList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map((user) => (
        <li className={styles.item} key={user.id}>
            <Link className={styles.link} to={`/users/${user.id}`}>
                {user.name}
            </Link>
        </li>
    ));

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.header}>Users</h2>
            <ul className={styles.list}>{renderedUsers}</ul>
        </section>
    );
};

export default UsersList;
