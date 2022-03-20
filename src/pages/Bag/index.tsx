import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { firestore } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

import cakeImg from '../../images/docecia.jpeg'
import { GoTrashcan } from 'react-icons/go'
import styles from './styles.module.scss'
import { formatDateString } from '../../helpers'

export function Bag(){
  const {user} = useAuth()
  const [orders, setOrders] = useState<any[]>()
  const [pickupLocal, setPickupLocal] = useState(false)
  
  // console.log(user?.id)
  // console.log(orders)

  const validator = yup.object().shape({
    street: yup.string(),
    streetNumber: yup.string(),
    pickupLocal: yup.bool(),
    phone: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    payment: yup.string().required()
  })
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validator)
  })

  useEffect(()=>{
    if(user){
      orderQueryFirebase()
    }
  },[user])


  async function orderQueryFirebase() {
    const queryOrderCollection = await firestore.collection("order").where("client.id", "==", user?.id).get()
    const docsData = queryOrderCollection.docs.map( (doc) => {
      return ({
        data: doc.data().cake,
        id:doc.id
      }) 
    })

    setOrders(docsData)
  }

  function deleteFirebaseOrder(id: any){
    firestore.collection("order").doc(id).delete().then(()=> {
      console.log("Document successfully deleted! ID: ", id)
      orderQueryFirebase()
    })
  }

  function onSubmitButton(data: any){
    console.log(data)
    firestore.collection("completedOrder").add({
      orders: orders,
      deliveryDate: {
        pickupLocal: data?.pickupLocal,
        addres: {
          street: data?.street,
          streetNumber: data?.streetNumber
        },
        date: data?.date,
        time: data?.time
      },
      phone: data?.phone,
      payment: data?.payment,
      createdAt: new Date()
    }).then((completedOrderRef) => {
      console.log("Document written with ID: ", completedOrderRef.id)
    })
    
    const encodedOrderMessage = window.encodeURIComponent(`*ENCOMENDA* 🗒️
    👤CLIENTE: ${user?.name}
    📱Telefone: ${data?.phone}

    *Pedido(s):*
    ${orders?.map((order)=>{
      return(
        `🎂 ${order.data.name.toUpperCase()}
        _Tamanho_: ${order.data.size}        
        _Massa_: ${order.data.batter}
        _Recheio_(s): ${order.data.fillings}
        _Observação_: ${order.data.note}`
      )})}
    
    🛵 *ENTREGA:*
    ${pickupLocal ? ("_*Retirada no local*_ 📍")
    : (
      `_*Rua:*_ ${data?.street}  _*Nº:*_ ${data?.streetNumber}`
      )}
    _*Data:*_ ${formatDateString(data?.date)}  _*Hora:*_ ${data?.time} ⏰
    
    *Forma de pagament:*
    ${data?.payment}

    Caro cliente, pedimos que após o envio da mensagem aguarde que iremos respondê-lo.
    `)

    redirecionar(encodedOrderMessage)
    reset()
    setPickupLocal(false)
  }

  useEffect(()=>{
    console.log(errors)
  },[errors])


  function redirecionar(orderMessage: string){
    window.open(`https://api.whatsapp.com/send?phone=5584981385287&text=${orderMessage}`)
  }

  return (
    <>
      <div>
        <h2>Pedidos</h2>
        {orders?.map((order)=> (

          <div className={styles.orderCard} key={orders.indexOf(order)}>

            <img src={cakeImg} alt="Cake" />

            <div>
              <h3>{order.data.name} <span>{order.data.size}</span> </h3>
              <div className={styles.orderInfo}>
                <p>Massa: {order.data.batter}</p>
                <p>Recheio(s): {order.data.fillings}</p>
              </div>
              <div className={styles.orderPrice}>
                <p> <span>R$</span> {order.data.price}</p>
                <GoTrashcan onClick={() => deleteFirebaseOrder(order.id)}/>
              </div>
            </div>

          </div>
        ))}

        <hr />
      </div>

      <form onSubmit={handleSubmit(onSubmitButton)} className={styles.form}>
        <div>
          <h2>Dados</h2>
          <div className={styles.address}>
            <p>Endereço para entrega:</p>

            Rua <input 
                  {...register("street")}
                  type="text"
                  required={!pickupLocal}
                  disabled={pickupLocal}
                />
                {errors.street && <span>{errors.street.message}</span>}
            Nº <input 
                {...register("streetNumber")}
                type="number"
                required={!pickupLocal}
                disabled={pickupLocal}
              />
            <label htmlFor="pickup-local">
              <input 
                {...register("pickupLocal")}
                id="pickup-local"
                type="checkbox"
                checked={pickupLocal}
                onChange={(event) => {
                  console.log(event.target.checked)
                  setPickupLocal(event.target.checked)
                }}
              />
              Retirada no local
            </label>
          </div>
          Telefone <input 
                    {...register("phone")}
                    type="tel"
                  />
          <p>Data e hora da entrega do pedido:</p>
          Data <input 
                {...register("date")}
                type="date" 
              />
          Hora <input 
                {...register("time")}
                type="time"
              />
        </div>
        
        <div>
          <h2>Forma de Pagamento</h2>
          <input
              {...register("payment")}
              type="radio"
              value='cartao'
              id='cartao'
            />
          <label htmlFor="cartao">Cartão</label>
          
          <input
              {...register("payment")}
              type="radio"
              value="pix"
              id='pix'
            />
          <label htmlFor="pix">Pix</label>

          <input
              {...register("payment")}
              type="radio"
              value="dinheiro"
              id='dinheiro'
            />
          <label htmlFor="dinheiro">Dinheiro</label>
        </div>

        <button 
          type='submit'
          onClick={() => redirecionar}
        >Enviar</button>
      </form>
    </>
  )
}