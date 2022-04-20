import { Menu } from '../Menu'

import bgImg from '../../images/docecia_bg.jpeg'
import logoImg from '../../images/docecia_logo.jpeg'
import whatsappImg from '../../images/whatsapp_64.png'

import { GrInstagram } from 'react-icons/gr'
import styles from './styles.module.scss'

export function Home(){
  return (
    <>
      <div className={styles.homeContainer} id="home">
        

        <section>
          <img src={logoImg} alt="Logo Doce&Cia" />
          <p>
            Feliz quem faz arte transformando amor em bolos.
            <a href="https://www.instagram.com/doceciia_/" target="_blank" rel="noreferrer">
              <GrInstagram/> @doceciia_
            </a>
          </p>
        </section>

        <img src={bgImg} alt="" className={styles.backgroundImg}/>
        
        <a href="https://api.whatsapp.com/send?phone=5584981449946" target="_blank" rel="noreferrer" className={styles.wppButton}>
          <img src={whatsappImg} alt="Whatsapp button" />
        </a>
      </div>
      
      <Menu />
    </>
  )
}