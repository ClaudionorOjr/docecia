import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import styles from './styles.module.scss'

export function DropdownMenu() {
  const [active, setActive] = useState(false)
  const { pathname } = useLocation()

  const ToggleMode = () => {
    setActive(!active)
  }
  return (
    <div className={styles.dropdownMenu} onClick={ToggleMode}>
      <div className={active ? styles.hamburgerClose : styles.hamburgerOpen }> </div>
      <nav className={active ? styles.menuOpen : styles.menuClose}>
        <Link
          to="/"
          className={pathname === '/' ? styles.active : ''}
        >
          Início
        </Link>
        <Link
          to="/bag"
          className={pathname === '/bag' ? styles.active : ''}
        >
          Sacola
        </Link>
      </nav>
    </div>
  )
}