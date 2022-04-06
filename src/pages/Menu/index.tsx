import { useEffect, useState } from 'react'

import { Card } from './Card'
import { firestore } from '../../services/firebase'

import { GiStairsCake } from 'react-icons/gi';
import styles from './styles.module.scss'

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
    async function retrieveFirebaseData() {
      const cakeCollection = await firestore.collection('cakes').get()
      const docsData = cakeCollection.docs.map((doc) => {
        return doc.data() as FirebaseCakesData
      })

      setCakes(docsData)
    }

    retrieveFirebaseData()

  },[])

  return (
    <div className={styles.menuContainer} id="menu">
      <h2> 
        <GiStairsCake />
        Escolha do Bolo
      </h2>

      {cakes?.map((cake) => (
        <Card key={cakes.indexOf(cake)} cakeData={cake}/>
      ))}
      
    </div>
  )
}