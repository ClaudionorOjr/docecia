import amanteigado from '../../images/cake_amanteigado.png'
import chocolate from '../../images/cake_chocolate.png'

import styles from './styles.module.scss'

export function MakeCake(){
  const fillings = ['ninho', 'chocolate', 'crocante', 'duo']
  
  const showAdditionalBox = () =>{
    let additionalBox = document.querySelector(`.${styles.additionalBox}`) as HTMLElement

    if(additionalBox.style.display === 'flex'){
      additionalBox.style.display = 'none'
    } else {
      additionalBox.style.display = 'flex'
    }

    

  }

  return (
    <>
      <h2>Massas</h2>
      <section className={styles.cakeBatters}>
        <label htmlFor="branca" className={styles.batter} >
          <input type="checkbox" name="branca-amenteigada" id="branca" />
          <img src={amanteigado} alt="branca amanteigada" />
          <p>Branca Amanteigada</p>
        </label>

        <label htmlFor="chocolate-batter" className={styles.batter} >
          <input type="checkbox" name="chocolate" id="chocolate-batter" />
          <img src={chocolate} alt="chocolate" />
          <p>Chocolate</p>
        </label>
      </section>

      <h2>Recheios</h2>
      <section className={styles.fillings}>
        {fillings.map(filling => (  
          <label htmlFor={filling}>
          <input type="checkbox" name={filling} id={filling} />
            {filling}
          </label>
        ))}
      </section>

      <div className={styles.gridContainer}>

      <h2>Adicionais</h2>
      <section className={styles.additional}>
        <label htmlFor="topo" >
          <input type="checkbox" name="topo" id="topo" onChange={showAdditionalBox} />
          Topo do bolo
        </label>
        
        <div className={styles.additionalBox}>
          <label htmlFor="item-1">
            <input type="checkbox" name="" id="item-1" />
            Item 1
          </label>

          <label htmlFor="item-2">
            <input type="checkbox" name="" id="item-2" />
            Item 2
          </label>

          <label htmlFor="item-3">
            <input type="checkbox" name="" id="item-3" />
            Item 3
          </label>
        </div>
      
      </section>

      <h2>Observação</h2>
      <section className={styles.observation}>
        <div>
          <p>Use o espaço abaixo para algum aviso ou orientação a respeito do pedido.</p>
          <textarea name="" id="" cols={60} rows={10} placeholder="Escreva aqui..."></textarea>
        </div>
      </section>

      <button className={styles.buttonAddBag}>Adicione a sacola</button>

    </div>
    </>
  )
}