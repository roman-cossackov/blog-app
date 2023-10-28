import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.title} to="/">Redux Blog</Link>
            {/* <h1 className={styles.title}>Redux Blog</h1> */}
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li>
                        <Link className={styles.link} to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="posts">Add New Post</Link>
                    </li>
                    <li>
                        <Link to="users">Users</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
