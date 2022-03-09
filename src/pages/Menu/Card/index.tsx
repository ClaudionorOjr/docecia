import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import cakeImg from '../../../images/docecia.jpeg'
import styles from './styles.module.scss'

interface CardProps {
  cakeName: string
}

export function Card({ cakeName }: CardProps){
  const navigate = useNavigate()

  const sizes = ['10', '12', '14', '16', '18']
  const [selectedSize, setSelectedSize] = useState('10')
  
  function quantitySlices(size: string){
    if(size === '10'){
      return {
        slices: 8,
        price: '16,00'
      }

    } else if(size === '12'){
      return {
        slices: 10,
        price: '20,00'
      }
      
    } else if(size === '14'){
      return {
        slices: 16,
        price: '26,00'
      }
      
    } else if(size === '16'){
      return {
        slices: 20,
        price: '32,00'
      }
      
    } else if(size === '18'){
      return {
        slices: 24,
        price: '46,00'
      }
      
    }
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
            <>
              <input 
                type="radio" 
                name={cakeName} 
                value={size}
                id={cakeName+size}
                checked={selectedSize === size}
                onChange={event => setSelectedSize(event.target.value)} 
              />
              <label htmlFor={cakeName+size}>{size}</label>
            </>
          ))}

          {console.log(selectedSize)}
          
        </div>

        <p>Serve até {quantitySlices(selectedSize)?.slices} fatias</p>
        <p><span>R$</span> {quantitySlices(selectedSize)?.price}</p>
      </div>  
      
      <button onClick={() => navigate(`/${cakeName}/makecake`)}>Montar bolo</button>
      {/* Corrigir esse caminho de navegação */}
    </div>
  )
}