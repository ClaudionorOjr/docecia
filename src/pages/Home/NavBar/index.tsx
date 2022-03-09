import styles from './styles.module.scss';

import { Link } from 'react-scroll'

export function NavBar(){
  return (
    <div className={styles.navContainer}>
      <nav>
        <Link 
          to="home"
          smooth={true}
          duration={500}
        > Início </Link> {/* Desnecessário p/ início. Gênio! */}
        <Link 
          to="menu" 
          smooth={true} 
          duration={500}
        > Page </Link>
        <Link 
          to="menu" 
          smooth={true} 
          duration={500}
        > Page </Link>

      </nav>
    </div>
  )
}