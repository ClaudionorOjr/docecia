import styles from './styles.module.scss'

import { Card } from './Card'
import { firestore } from '../../services/firebase'
import { useEffect, useState } from 'react'

export type FirebaseCakesData = {
  name: string
  sizes: [
    {
      size: string
      price: number
      slices: number
    }
  ]
}

export function Menu(){

  const [cakes, setCakes] = useState<FirebaseCakesData[]>()
  
  useEffect(() => {
    async function retrievedFirebaseData() {
      const cakeCollection = await firestore.collection('cakes').get()
      const docsData = cakeCollection.docs.map((doc) => {
        return doc.data() as FirebaseCakesData
      })

      setCakes(docsData)
    }

    retrievedFirebaseData()

  },[])

  return (
    <div className={styles.menuContainer} id="menu">
      <h2> Escolha do bolo </h2>

      {cakes?.map((cake) => (
        <Card key={cakes.indexOf(cake)} cakeData={cake}/>
      ))}
      
    </div>
  )
}