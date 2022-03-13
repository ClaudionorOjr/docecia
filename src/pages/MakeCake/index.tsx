import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './styles.module.scss'

export function MakeCake(){
  const validator = yup.object().shape({
    name: yup.boolean()
        .required(),
  });

  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(validator)
  })

  return (
    <form onSubmit={handleSubmit((data: any) => {      
    })}>
      <input 
        {...register('name')}
        type="radio"
        name='recheio'
        id='ninho'
      />
      <label htmlFor="ninho">Ninho</label>

      <input 
        {...register('name')}
        type="radio"
        name='recheio'
        id='chocolate'
      />
      <label htmlFor="chocolate">Chocolate</label>

      <input 
        {...register('name')}
        type="radio"
        name='recheio'
        id='chocolate'
      />
      <label htmlFor="chocolate">Chocolate</label>

      <br />

      <textarea cols={40} rows={10}/>

      <br />
      <button type="submit">Confirmar</button>
    </form>
  )
}