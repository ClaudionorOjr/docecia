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

import styles from './styles.module.scss'

const cakeImages: any = {
  brancaAmanteigada: amanteigadoCakeImage,
  chocolate: chocolateCakeImage,
} 

export function MakeCake(){
  const navigate = useNavigate()
  const { cakeInfo } = useContext(CakeInfoContext)
  const { user } = useAuth()

  const validator = yup.object().shape({
    filling: yup.array(yup.string())
      .required("Escolha até 2 recheio")
      .min(1, "Escolha pelo menos 1 recheio")
      .max(2, "Limitado a 2 recheios"),
    batter: yup.string()
      .required("Escolha um tipo de massa"),
    observation: yup.string()
  });

  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validator)
  })

  useEffect(() => {
    setValue('batter', '');
    setValue('filling', undefined);
  }, []);

  function onSubmitButton(data: any){
    console.log(data)
    firestore.collection("order").add({
      client: {
        id: user?.id,
        name: user?.name
      },
      cake: {
        name: cakeInfo?.name,
        size: cakeInfo?.size,
        price: cakeInfo?.price,
        batter: data.batter,
        fillings: data.filling,
        note: data.observation
      }
    }).then((orderRef)=> {
      console.log("Document written with ID: ", orderRef.id)
    })
    reset()
    navigate('/bag')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitButton)}>

      <h1 className={styles.sectionTitle}>Massas</h1>
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

      <h1 className={styles.sectionTitle}>Recheios</h1>
      <div className={styles.formSection}>
        <div className={styles.fillingSection}>
          {
              mockData.recheios.map((filling) => (
                <div 
                  key={`${filling.id}`}
                  className={`${styles.cakeFillingOption} ${styles.inputOption}`}
                >
                  <input 
                    {...register('filling')}
                    type="checkbox"
                    value={filling.name}
                    id={`filling-${filling.id}`}
                  />
                  <label htmlFor={`filling-${filling.id}`}>{filling.name}</label>
                </div>
              ))
            }
        </div>
        {errors.filling && <span className="errorMessage">{errors.filling.message}</span>}
      </div>

      <h1 className={styles.sectionTitle}>Observações</h1>
      <div className={styles.formSection}>
        <textarea
          {...register('observation')}
          placeholder='Insira uma observação'
        />
      </div>
      
      <div className={styles.buttonContainer}>
        <button type="submit">Adicionar a sacola</button>
      </div>

      <p>{cakeInfo?.name}</p>
      <p>{cakeInfo?.price}</p>
      <p>{cakeInfo?.size}</p>
    </form>
  )
}