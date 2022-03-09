import { useEffect, useState } from "react"

import { auth, firebase } from "../../services/firebase"

import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

type User = {
  id: string
  name: string
  avatar: string
}

export function SignInButton() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }  
    })

    return () => {
      unsubscribe()
    }
  },[])

  async function singInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if(result.user){
      const { displayName, photoURL, uid } = result.user

      if(!displayName || !photoURL){
        throw new Error('Missing informatin from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  async function handleSignOut(){
    await firebase.auth().signOut()

    setUser(undefined)
  }

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
      onClick={singInWithGoogle}
    >
      Entrar
    </button>
  ) 
}