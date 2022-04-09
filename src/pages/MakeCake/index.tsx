import { useContext, useEffect } from 'react';

import { firestore } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CakeInfoContext } from '../../routes';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { mockData } from '../../mock';


import chocolateCakeImage from '../../images/cake_chocolate.png';
import amanteigadoCakeImage from '../../images/cake_amanteigado.png';

import { SiCakephp } from 'react-icons/si'
import { GiCakeSlice } from 'react-icons/gi'
import styles from './styles.module.scss'

const cakeImages: any = {
  brancaAmanteigada: amanteigadoCakeImage,
  chocolate: chocolateCakeImage,
}

//! Alterei aqui e useEffect e nos campos dos formulários
type MakeCakeType = {
  batter: string,
  fillings: string,
  note: string
}

export function MakeCake(){
  const navigate = useNavigate()
  const { cakeInfo } = useContext(CakeInfoContext)
  const { user } = useAuth()

  const validator = yup.object().shape({
    fillings: yup.array(yup.string())
      .required("Escolha até 2 recheio")
      .min(1, "Escolha pelo menos 1 recheio")
      .max(2, "Limitado a 2 recheios")
      .nullable(),
    batter: yup.string()
      .required("Escolha um tipo de massa"),
    note: yup.string()
  });

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<MakeCakeType>({
    resolver: yupResolver(validator)
  })

  useEffect(() => {
    setValue('batter', '');
    setValue('fillings', '');
  }, []);

  function onSubmitButton(makeCakeData: MakeCakeType){
    console.log(makeCakeData)
    firestore.collection("order").add({
      client: {
        id: user?.id,
        name: user?.name
      },
      cake: {
        imageURL: cakeInfo?.imageURL,
        name: cakeInfo?.name,
        size: cakeInfo?.size,
        price: cakeInfo?.price,
        batter: makeCakeData.batter,
        fillings: makeCakeData.fillings,
        note: makeCakeData.note
      }
    }).then((orderRef)=> {
      console.log("Document written with ID: ", orderRef.id)
    })
    reset()
    navigate('/bag')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitButton)} className={styles.formContainer}>

      <h1 className={styles.sectionTitle}>
        <SiCakephp />
        Massas
      </h1>
      <div className={styles.formSection}>
        <div className={styles.batterSection}>
          {
            mockData.massas.map((batter) => (
              <div 
                key={`${batter.name}`}
                className={`${styles.cakeBatterOption} ${styles.inputOption}`}
              >
                <img src={cakeImages[batter.key]} alt={`${batter.name}`} />
                <input 
                  {...register('batter')}
                  type="radio"
                  value={batter.name}
                  id={`batter-${batter.id}`}
                />
                <label htmlFor={`batter-${batter.id}`}>{batter.name}</label>
              </div>
            ))
          }
        </div>
        {errors.batter && <span className='errorMessage'>{errors.batter.message}</span>}
      </div>

      <h1 className={styles.sectionTitle}>
        <GiCakeSlice />
        Recheios
      </h1>
      <div className={styles.formSection}>
        <div className={styles.fillingSection}>
          {
              mockData.recheios.map((fillings) => (
                <div 
                  key={`${fillings.id}`}
                  className={`${styles.cakeFillingOption} ${styles.inputOption}`}
                >
                  <input 
                    {...register('fillings')}
                    type="checkbox"
                    value={fillings.name}
                    id={`filling-${fillings.id}`}
                  />
                  <label htmlFor={`filling-${fillings.id}`}>{fillings.name}</label>
                </div>
              ))
            }
        </div>
        {errors.fillings && <span className="errorMessage">{errors.fillings.message}</span>}
      </div>

      <h1 className={styles.sectionTitle}>Observações</h1>
      <div className={styles.formSection}>
        <p>Utilize do campo abaixo para comunicar alguma observação sobre o pedido.</p>
        <textarea
          {...register('note')}
          placeholder='Insira uma observação'
        />
      </div>
      
      <div className={styles.buttonContainer}>
        <button type="submit">Adicionar à sacola</button>
      </div>

      <p>{cakeInfo?.name}</p>
      <p>{cakeInfo?.price}</p>
      <p>{cakeInfo?.size}</p>
    </form>
  )
}