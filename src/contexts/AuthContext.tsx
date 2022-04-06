import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from "../services/firebase"

import userImg from '../images/Avatar.svg';

type User = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
  handleSignOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType) //* O formato que será armazenado no contexto

export function AuthContextProvider({children}: AuthContextProviderProps){
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
          avatar: photoURL ? photoURL : userImg
        })
      }  
    })

    return () => {
      unsubscribe()
    }
  },[])

  async function signInWithGoogle(){
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
        avatar: photoURL ? photoURL : userImg
      })
    }
  }

  async function handleSignOut(){
    await firebase.auth().signOut()

    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle, handleSignOut}}>
      {children}
    </AuthContext.Provider>
  )
}