import { Link } from 'react-scroll'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header(){
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <nav>
          <Link 
            to="home" 
            smooth={true} 
            duration={500}
            className={styles.active}
          >
            Início 
          </Link>

          <Link 
            to="menu" 
            smooth={true} 
            duration={500}
          > 
            Menu
          </Link>

        </nav>
        <SignInButton />
      </div>
    </header>
  )
}