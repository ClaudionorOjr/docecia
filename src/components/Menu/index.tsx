import styles from './styles.module.scss'

import cakeImg from '../../images/docecia.jpeg'
import { useState } from 'react'

// interface MenuProps {
//   sizes: Array<number>
// }

export function Menu(){
  // let sizeChecked = document.querySelectorAll("input[type='radio']")
  // // let sizeChecked = document.getElementsByName('size')

  // for (let i = 0; i < sizeChecked.length; i++) {
  //   sizeChecked[i] as HTMLInputElement
  //   console.log(typeof sizeChecked[i])
  //   // if ((sizeChecked[i] as HTMLInputElement).checked) {
  //   //   console.log(sizeChecked[i])
  //   // }
  // }

  // console.log(sizeChecked)
  // let selected = document.querySelector('input[type="radio"]:checked') as HTMLInputElement
  
  // let valueSelected = selected.value
  // console.log(valueSelected)

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
    <div className={styles.menuContainer} id="menu">
      <h2> Escolha do bolo </h2>
      <div className={styles.cardCake}>
        <img src={cakeImg} alt="cake" />
        
        <div className={styles.infoCake}>
          <p className={styles.title}>
            Naked Cake
          </p>

          <div className={styles.sizeCake}>
            <p>Tamanhos</p>
            
            {
              sizes.map( size => (
              <>
                <input 
                  type="radio" 
                  name="naked-size" 
                  value={size}
                  id={'naked-'+size}
                  checked={selectedSize === size}
                  onChange={event => setSelectedSize(event.target.value)} 
                />
                <label htmlFor={'naked-'+size}>{size}</label>
              </>
            ))}

            {console.log(selectedSize)}
            
          </div>

          <p>Serve até {quantitySlices(selectedSize)?.slices} fatias</p>
          <p><span>R$</span> {quantitySlices(selectedSize)?.price}</p>
        </div>  
        
        <button type="submit">Montar bolo</button>
      </div>
    </div>
  )
}