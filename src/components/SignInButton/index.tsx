import { useAuth } from '../../hooks/useAuth'

import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
  const {user, signInWithGoogle, handleSignOut} = useAuth()

  return user ? (
    <button
      className={styles.signOutButton}
      onClick={handleSignOut}
    >
      <img src={user.avatar} alt="profile" />
      {user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={signInWithGoogle}
    >
      Entrar
    </button>
  ) 
}