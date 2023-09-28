import { Link } from "react-router-dom"

import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <h1 className={styles.header__title}>Redux Blog</h1>
        <nav className={styles.header__nav}>
            <ul className={styles.header__list}>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='posts'>Posts</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header