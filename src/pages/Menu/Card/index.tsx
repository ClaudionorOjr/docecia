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
  const { setTestData } = useContext(CakeInfoContext)
  const navigate = useNavigate()
  
  const sizeOptions = cakeData.sizes.map((option) => {
    return {...option}
  })
  
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0].size)
  const [price, setPrice] = useState<number>(sizeOptions[0].price)
  const [slices, setSlices] = useState<number>(sizeOptions[0].slices)

  async function handleMakeCake(){
    if(!user) {
      await signInWithGoogle()    
    }

    setTestData({
      name: cakeData.name,
      size: selectedSize,
      price: price
    })

    navigate(`/makecake`)
  }

  return (
    <div className={styles.cakeCard}>
      <img src={cakeImg} alt="cake" />
      
      <div className={styles.cakeInfo}>
        <p className={styles.title}>
          {cakeData.name}
        </p>

        <div className={styles.cakeSize}>
          <p>Tamanhos</p>

          {sizeOptions.map ((option) =>(
            <label htmlFor={`${cakeData.name}_${option.size}`} key={sizeOptions.indexOf(option)}>
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
                {option.size}
              </label>
          ))}                   
        </div>
        
        <p>Serve até {slices} fatias</p>
        <p><span>R$</span> {price}</p>
      </div>  
      
      <button onClick={handleMakeCake}>Montar bolo</button>
    </div>
  )
}