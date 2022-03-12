import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import amanteigado from '../../images/cake_amanteigado.png'
import chocolate from '../../images/cake_chocolate.png'
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
        type="text"
      />
      <button type="submit">Confirmar</button>
    </form>
  )
}