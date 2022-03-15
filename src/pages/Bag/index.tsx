import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export function Bag(){  
  const { register, handleSubmit, formState: { errors }} = useForm()

  return (
    <>
      <div>
        <h2>Pedidos</h2>
        <div>
          <p>Card de pedidos...</p>
        </div>
        <hr />
      </div>

      <form>
        <div>
          <h2>Dados</h2>
          Telefone <input type="text" />
          <div>
            Rua <input type="text" />
            Nº <input type="number" />
            <input type="checkbox" />
          </div>
          <input type="date" />
          <input type="datetime-local"/>
        </div>
        
        <div>
          <h2>Forma de Pagamento</h2>

        </div>
      </form>
    </>
  )
}