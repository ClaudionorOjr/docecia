import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import cakeImg from '../../../images/docecia.jpeg'
import { firestore } from '../../../services/firebase'
import styles from './styles.module.scss'

type CardProps = {
  cakeName: string
}

export function Card({ cakeName }: CardProps){
  const navigate = useNavigate()

  const [sizes, setSizes] = useState<string[]>([])
  const [selectedSize, setSelectedSize] = useState('')
  const [price, setPrice] = useState()
  const [slices, setSlices] = useState()

  useEffect(()=>{

    var vetorAux:string[] = []

    firestore.collection("cakes").doc(cakeName).collection("sizes").orderBy("price").get().then((querySnapshot)=>{
      querySnapshot.forEach((sizeDoc) => {
        vetorAux.push(sizeDoc.id)
        
      })

      /**
       * ? Porque estou utilizando o 'vetorAux' ao invés do 'sizes'? Pq o valor de sizes ainda está como undefined até que o useEffect seja terminado de executar, então vai setar os valores dos estados 'selectedSize', 'price' e 'slices' como undefined, já o 'vetorAux' possui os valores dos tamanhos vindo do firestore e consegue setar esses estados com os valores.
       */
      setSizes(vetorAux) // atribui valores ao array de estados 'sizes'
      setSelectedSize(vetorAux[0]) // inicia o estado de selectedSize com o primeiro elemento do array 'vetorAux'
      sizeData(vetorAux[0]) 

    })

  },[])

  function sizeData(size: string){
    firestore.collection("cakes").doc(cakeName).collection("sizes").doc(size).get().then((doc) => {
      if(doc.exists){
        const info = doc.data()!

        setPrice(info.price)
        setSlices(info.slices)
      }
    })
  }

  return (
    <div className={styles.cakeCard}>
      <img src={cakeImg} alt="cake" />
      
      <div className={styles.cakeInfo}>
        <p className={styles.title}>
          {cakeName}
        </p>

        <div className={styles.cakeSize}>
          <p>Tamanhos</p>

          {sizes.map( size => (
            <label htmlFor={`${cakeName}_${size}`} key={`${cakeName}_${size}`}>
              <input
                type="radio" 
                name={cakeName} 
                value={size}
                id={`${cakeName}_${size}`}
                checked={selectedSize === size}
                onChange={event => {
                  setSelectedSize(event.target.value)
                  sizeData(event.target.value)
                }}
              />
              {size}
            </label>
          ))}
          
        </div>
        
        <p>Serve até {slices} fatias</p>
        <p><span>R$</span> {price}</p>
      </div>  
      
      <button onClick={() => navigate(`/${cakeName}/makecake`)}>Montar bolo</button>
    </div>
  )
}