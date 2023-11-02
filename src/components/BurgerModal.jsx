import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

import styles from "../css/BurgerModal.module.css";

const BurgerModal = (props) => {
    return createPortal(
        <div className={styles.modal}>
            <ul className={styles.list}>
                <li >
                    <Link className={styles.link} to="/" onClick={() => {props.setHamburgerMenu(false)}}>
                        Home
                    </Link>
                </li>
                <hr />
                <li >
                    <Link className={styles.link} to="posts" onClick={() => {props.setHamburgerMenu(false)}}>Add New Post</Link >
                </li>
                <hr />
                <li >
                    <Link className={styles.link} to="users" onClick={() => {props.setHamburgerMenu(false)}}>Users</Link>
                </li>
                <hr />
            </ul>
        </div>,
        document.getElementById("modal")
    );
};

export default BurgerModal;
