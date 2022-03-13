import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './styles.module.scss'

export function MakeCake(){
  const validator = yup.object().shape({
    recheio: yup.array(yup.string()).required().max(2, "Limit of 2 fillings"),
    massa: yup.string().required()
  });

  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(validator)
  })

  function onSubmitButton(data: any){
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitButton)}>

      <div className='massas'>
        <input 
          {...register('massa')}
          type="radio"
          name="massa"
          value="branca amanteigada"
          id='branca amanteigada'
        />
        <label htmlFor="branca amanteigada">branca amanteigada</label>

        <input 
          {...register('massa')}
          type="radio"
          value="chocolate"
          id='chocolate-massa'
        />
        <label htmlFor="chocolate-massa">chocolate</label>
      </div>

      <br />

      <div className="recheios">
        <input 
          type='checkbox'
          value='ninho'
          id='ninho'
          {...register("recheio")}
        />
        <label htmlFor="ninho">Ninho</label>

        <input 
          type='checkbox'
          value='chocolate'
          id='chocolate'
          {...register("recheio")}
        />
        <label htmlFor="chocolate">Chocolate</label>

        <input 
          type='checkbox'
          value='crocante'
          id='crocante'
          {...register("recheio")}
        />
        <label htmlFor="crocante">Crocante</label>

        <input 
          type='checkbox'
          value='duo'
          id='duo'
          {...register("recheio")}
        />
        <label htmlFor="duo">Duo</label>

        <br/>
        {errors.recheio && <span>{errors.recheio.message}</span>}
      </div>

      <br />

      <button type="submit">Confirmar</button>
    </form>
  )
}