import { NavBar } from './NavBar'
import { Menu } from '../Menu'

import bgImg from '../../images/docecia_bg.jpeg'
import logoImg from '../../images/docecia_logo.jpeg'
import cakeImg from '../../images/docecia.jpeg';
import whatsappImg from '../../images/whatsapp_64.png'

import styles from './styles.module.scss'

export function Home(){
  return (
    <>
      <div className={styles.homeContainer} id="home">
        
        <img src={cakeImg} alt="" className={styles.backgroundImg}/>

        {/* <NavBar /> */}

        <section>
          <img src={logoImg} alt="Logo Doce&Cia" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in semper justo, ut egestas ex. Cras sollicitudin id felis a maximus. Praesent et massa quis ante luctus egestas. Maecenas vel justo dolor.
          </p>
        </section>

        <a href="https://api.whatsapp.com/send?phone=5584981385287" target="_blank">
          <img src={whatsappImg} alt="Whatsapp button" />
        </a>
      </div>
      
      <Menu />
    </>
  )
}