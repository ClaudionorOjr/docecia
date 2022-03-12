import styles from './styles.module.scss'

import { Card } from './Card'
import { firestore } from '../../services/firebase'
import { useEffect, useState } from 'react'

export function Menu(){
  const [cakes, setCakes] = useState<string[]>([])
  
  useEffect(()=>{
    const vetorAux: string[] = []
    firestore.collection("cakes").get().then(
      (querySnapshot)=>{
        querySnapshot.forEach((cakeDoc) =>{
          vetorAux.push(cakeDoc.id) // O nome dos bolos está no id
        })

        setCakes(vetorAux)
      })

  },[])

  return (
    <div className={styles.menuContainer} id="menu">
      <h2> Escolha do bolo </h2>
      {cakes.map(cake => (
        <Card key={cake} cakeName={cake} />
      ))}
    </div>
  )
}