import styles from './styles.module.scss'

import { Card } from './Card'

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

  const cakes = ['naked cake', 'vulcão', 'festa']

  return (
    <div className={styles.menuContainer} id="menu">
      <h2> Escolha do bolo </h2>
      {cakes.map(cake => (
        <Card key={cake} cakeName={cake} />
      ))}
    </div>
  )
}