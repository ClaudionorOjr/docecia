import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FirebaseCakesData } from '..'
import { useAuth } from '../../../hooks/useAuth'
import { CakeInfoContext } from '../../../routes'

import cakeImg from '../../../images/docecia.jpeg'

import styles from './styles.module.scss'

type CardProps = {
  cakeData: FirebaseCakesData
}

export function Card({ cakeData }: CardProps){
  const { user, signInWithGoogle } = useAuth()
  const { setCakeInfo } = useContext(CakeInfoContext)

  const navigate = useNavigate()
  
  const sizeOptions = cakeData.sizes.map((option) => {
    return {...option}
  })

  const initialSize = sizeOptions[0].size
  const initialPrice = sizeOptions[0].price
  const initialSlices = sizeOptions[0].slices

  const [selectedSize, setSelectedSize] = useState(initialSize)
  const [price, setPrice] = useState<number>(initialPrice)
  const [slices, setSlices] = useState<number>(initialSlices)

  async function handleMakeCake(){
    if(!user) {
      await signInWithGoogle()    
    }

    setCakeInfo({
      name: cakeData.name,
      size: selectedSize,
      price: price
    })

    navigate(`/makecake`)
  }

  function priceFormat(price: number){
    return new Intl.NumberFormat('pt-BR', {
      style: "currency",
      currency: 'BRL',
    }).format(price)
  }

  return (
    <div className={styles.cakeCard}>
      <img src={cakeImg} alt="cake" />
      
      <div className={styles.cakeContent}>
        <p className={styles.title}>
          {cakeData.name}
        </p>

        <div className={styles.cakeSize}>
          <p>Tamanhos</p>

          {sizeOptions.map ((option) =>(
            <div key={sizeOptions.indexOf(option)}>
              <input 
                type="radio" 
                name={cakeData.name}
                id={`${cakeData.name}_${option.size}`}
                checked={selectedSize === option.size}
                onChange={() => {
                  setSelectedSize(option.size)
                  setPrice(option.price)
                  setSlices(option.slices)
                }}
              />
              <label htmlFor={`${cakeData.name}_${option.size}`}>
                {option.size}
              </label>
            </div>  
          ))}                   
        </div>
        
        <p>Serve até {slices} fatias</p>
        <p className={styles.stylePrice}>{priceFormat(price)}</p>
      </div>  
      
      <button onClick={handleMakeCake}>Montar bolo</button>
    </div>
  )
}