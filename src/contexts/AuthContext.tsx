import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from "../services/firebase"

import userImg from '../images/Avatar.svg';
import { verifyErrorCodeFirebase } from "../helpers/verifyErrorCodeFirebase";
import { useLocation, useNavigate } from "react-router-dom";

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

const admin = process.env.REACT_APP_USER_ADMIN

export function AuthContextProvider({children}: AuthContextProviderProps){
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()
  const { pathname } = useLocation()

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

    try {
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

      if(result.user?.email === admin){
        navigate('/dashboard')
      }

      if(pathname === '/dashboard' && result.user?.email !== admin){
        navigate('/')
      }

    }catch(Error: any){
      const errorCode = Error.code
      let errorMessage = verifyErrorCodeFirebase(errorCode)

      if (errorMessage == null){
        errorMessage = Error.message
      }

      window.alert(errorMessage)
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