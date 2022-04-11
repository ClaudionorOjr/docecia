import { Link, useMatch, useLocation } from 'react-router-dom'
import { SignInButton } from '../SignInButton'

import { FiArrowLeftCircle } from "react-icons/fi";
import logoImg from '../../images/docecia_logo.png';
import styles from './styles.module.scss'


export function Header(){
  const isMakeCake = useMatch('/makecake')
  const { pathname } = useLocation()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>        
        {isMakeCake ? (
          <Link to='/' className={styles.back}>
            <FiArrowLeftCircle />
            Voltar
          </Link>
        ) : (
          <>
            <img src={logoImg} className={styles.logo} alt="Logo Doce&Cia" />
            
            <nav>
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
          </>
        )}        
        
        <SignInButton />
        
      </div>
    </header>
  )
}