import { NavBar } from './NavBar'

import bgImg from '../../images/docecia_bg.jpeg'
import logoImg from '../../images/docecia.jpeg'
import whatsappImg from '../../images/whatsapp_64.png'

import styles from './styles.module.scss'

export function Home(){
  return (
    <div className={styles.homeContainer} id="home">
      <img src={bgImg} alt="" className={styles.backgroundImg}/>

      <NavBar />

      <section>
        <img src={logoImg} alt="Logo Doce&Cia" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in semper justo, ut egestas ex. Cras sollicitudin id felis a maximus. Praesent et massa quis ante luctus egestas. Maecenas vel justo dolor.
        </p>
      </section>

      <button>
        <img src={whatsappImg} alt="Whatsapp button" />
      </button>
    </div>
  )
}