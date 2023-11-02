import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import BurgerModal from "./BurgerModal";
import styles from "../css/Header.module.css";

library.add(faBars);

const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
};

const Header = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    const onHamburgerClickHandler = () => {
        setHamburgerMenu((prev) => !prev);
    };

    useEffect(() => {
        const windowResizeHandler = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener("resize", windowResizeHandler);

        return () => {
            window.removeEventListener("resize", windowResizeHandler);
        };
    }, []);

    let nav;

    if (windowSize.innerWidth < 768) {
        nav = (
            <>
                <FontAwesomeIcon
                    className={styles.burgerButton}
                    icon={faBars}
                    onClick={onHamburgerClickHandler}
                />
                {hamburgerMenu && <BurgerModal setHamburgerMenu={setHamburgerMenu}/>}
                
            </>
        );
    } else {
        nav = (
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li>
                        <Link className={styles.link} to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="posts">Add New Post</Link>
                    </li>
                    <li>
                        <Link to="users">Users</Link>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <header className={styles.header}>
            <Link className={styles.title} to="/">
                Redux Blog
            </Link>
            {nav}
        </header>
    );
};

export default Header;
