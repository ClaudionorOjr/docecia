import { Link } from 'react-router-dom'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header(){
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <nav>
          <Link 
            to="/"
            className={styles.active}
          >
            Início 
          </Link>

          <Link 
            to="/bag"
          > 
            Sacola
          </Link>

        </nav>
        <SignInButton />
      </div>
    </header>
  )
}