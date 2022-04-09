import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { firestore } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

import { GoTrashcan } from 'react-icons/go'
import styles from './styles.module.scss'
import { dateFormat } from '../../helpers/dateFormat'
import { priceFormat } from '../../helpers/priceFormat'

type OrderType = {
  id: string
  cakeOrderData: {
    imageURL: string,
    name: string,
    size: string,
    price: number,
    batter: string,
    fillings: string,
    note: string
  }
}

type FormCompletedOrderType = {
  pickupLocal: boolean,
  street: string,
  streetNumber: string,
  date: Date,
  time: string,
  phone: string,
  payment: string,
  createdAt: Date
}

export function Bag(){
  const { user, signInWithGoogle } = useAuth()
  const [orders, setOrders] = useState<OrderType[]>()
  const [pickupLocal, setPickupLocal] = useState(false)

  console.log(orders)

  const validator = yup.object().shape({
    street: yup.string(),
    streetNumber: yup.string(),
    pickupLocal: yup.bool(),
    phone: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    payment: yup.string().required()
  })
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormCompletedOrderType>({
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
        cakeOrderData: doc.data().cake,
        id:doc.id
      }) as OrderType
    })

    setOrders(docsData)
  }

  function deleteFirebaseOrder(id: string){
    firestore.collection("order").doc(id).delete().then(()=> {
      console.log("Document successfully deleted! ID: ", id)
      orderQueryFirebase()
    })
  }

  //! Terminar esse código para mostrar o preço
  const totalPrice = orders?.map((order) => {
    return order.cakeOrderData.price
  })
  
  // let totalPrice =+ orders! ? (orders?.forEach((order) => {
  //   return order.cakeOrderData.price
  // })) : ("0,00")

  console.log(totalPrice)

  //! Se o user não estiver logado não pode enviar
  async function onSubmitButton(completedOrderData: FormCompletedOrderType){
    if(!user){
      await signInWithGoogle()
    } 
    console.log(completedOrderData)
    firestore.collection("completedOrder").add({
      orders: orders,
      deliveryDate: {
        pickupLocal: completedOrderData?.pickupLocal,
        addres: {
          street: completedOrderData?.pickupLocal ? ("") : (completedOrderData?.street),
          streetNumber: completedOrderData?.pickupLocal ? ("") : (completedOrderData?.streetNumber)
        },
        date: completedOrderData?.date,
        time: completedOrderData?.time
      },
      phone: completedOrderData?.phone,
      payment: completedOrderData?.payment,
      createdAt: new Date()
    }).then((completedOrderRef) => {
      console.log("Document written with ID: ", completedOrderRef.id)
    })
    
    const encodedOrderMessage = window.encodeURIComponent(`*ENCOMENDA* 🗒️
    👤CLIENTE: ${user?.name}
    📱Telefone: ${completedOrderData?.phone}

    *Pedido(s):*
    ${orders?.map((order)=>{

      return(
        `🎂 ${order.cakeOrderData.name.toUpperCase()}
        _Tamanho_: ${order.cakeOrderData.size}        
        _Massa_: ${order.cakeOrderData.batter}
        _Recheio_(s): ${order.cakeOrderData.fillings}
        _Observação_: ${order.cakeOrderData.note}`
      )})}
    
    🛵 *ENTREGA:*
    ${pickupLocal ? (
      "_*Retirada no local*_ 📍"
      ) : (
      `_*Rua:*_ ${completedOrderData?.street}  _*Nº:*_ ${completedOrderData?.streetNumber}`
      )}
    _*Data:*_ ${dateFormat(completedOrderData?.date)}  _*Hora:*_ ${completedOrderData?.time} ⏰
    
    *Forma de pagament:*
    ${completedOrderData?.payment}

    Caro cliente, pedimos que após o envio da mensagem aguarde que iremos respondê-lo.
    `)

    redirecionar(encodedOrderMessage)
    reset()
    setPickupLocal(false)
  }

  //! Retirar esse código
  useEffect(()=>{
    console.log(errors)
  },[errors])


  function redirecionar(orderMessage: string){
    window.open(`https://api.whatsapp.com/send?phone=5584981385287&text=${orderMessage}`)
  }

  return (
    <>
      <div className={styles.orderContainer} >
        <h2>Pedidos</h2>
        {orders?.map((order)=> (

          <div className={styles.orderCard} key={orders.indexOf(order)}>

            <img src={order.cakeOrderData.imageURL} alt="Cake" />

            <div>
              <h3>{order.cakeOrderData.name} <span>{order.cakeOrderData.size}</span> </h3>

              <div className={styles.orderInfo}>
                <p>Massa: {order.cakeOrderData.batter}</p>
                <p>Recheio(s): {order.cakeOrderData.fillings}</p>
              </div>

              <div className={styles.orderPrice}>
                <p>{priceFormat(order.cakeOrderData.price)}</p>
                <GoTrashcan onClick={() => deleteFirebaseOrder(order.id)}/>
              </div>
            </div>

          </div>
        ))}

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
              value='Cartão'
              id='cartao'
            />
          <label htmlFor="cartao">Cartão</label>
          
          <input
              {...register("payment")}
              type="radio"
              value="Pix"
              id='pix'
            />
          <label htmlFor="pix">Pix</label>

          <input
              {...register("payment")}
              type="radio"
              value="Dinheiro"
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