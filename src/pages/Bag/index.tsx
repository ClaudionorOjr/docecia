import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { firestore } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'

import pix from '../../images/pix.svg'
import { FaMoneyBill } from 'react-icons/fa'
import { GoTrashcan, GoCreditCard } from 'react-icons/go'
import styles from './styles.module.scss'
import { dateFormat } from '../../helpers/dateFormat'
import { priceFormat } from '../../helpers/priceFormat'

import './stylesTest.css'

type OrderType = {
  id: string
  cakeOrderData: {
    imageURL: string,
    name: string,
    size: string,
    price: number,
    batter: string,
    fillings: string[],
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

/**
 * * Backlog:
 * TODO Corrigir "Recheio(s)" no card de pedidos; ✔
 * TODO Terminar estilização da página de sacola; 
 * ! Hospedagem;
 * ! Responsividade de todo site;
 * ! Regras do firebase
 */

export function Bag(){
  const { user, signInWithGoogle } = useAuth()
  const [orders, setOrders] = useState<OrderType[]>()
  const [pickupLocal, setPickupLocal] = useState(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)

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

  //! Se o user não estiver logado não pode enviar
  async function onSubmitCompletedOrder(completedOrderData: FormCompletedOrderType){
    if(!user){
      await signInWithGoogle()
    } 
    console.log(completedOrderData)
    firestore.collection("completedOrder").add({
      orders: orders,
      deliveryData: {
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
      totalPrice: totalPrice,
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
        _Observação_: ${order.cakeOrderData.note}
      
      `
      )})}
    🛵 *ENTREGA:*
    ${pickupLocal ? (
      "_*Retirada no local*_ 📍"
      ) : (
      `_*Rua:*_ ${completedOrderData?.street}  _*Nº:*_ ${completedOrderData?.streetNumber}`
      )}
    _*Data:*_ ${dateFormat(completedOrderData?.date)}  _*Hora:*_ ${completedOrderData?.time} ⏰
    
    *Preço total:*
    ${priceFormat(totalPrice)}
    *Forma de pagamento:*
    ${completedOrderData?.payment}

    Caro cliente, pedimos que após o envio da mensagem aguarde que iremos respondê-lo.
    `)

    redirecionar(encodedOrderMessage)
    reset()
    setPickupLocal(false)
  }
  
  function redirecionar(orderMessage: string){
    window.open(`https://api.whatsapp.com/send?phone=5584981385287&text=${orderMessage}`)
  }

  //! Retirar código sobre erros
  useEffect(()=>{
    console.log(errors)
    
    function sumOrdersPrices(){
      const ordersPrices = orders?.map((order) => {
        return order.cakeOrderData.price
      })
    
      const sumPrices = ordersPrices ? (
          ordersPrices?.reduce((total, price)=> total + price, 0)
        ) : (0)
  
      setTotalPrice(sumPrices)
    }

    sumOrdersPrices()
  },[errors, orders])

  return (
    <>
      <div className={styles.orderContainer} >
        <h1>Pedidos</h1>

        <div className={styles.orderContent} id='testeScrollbar'>
          {orders?.map((order)=> (
            <div className={styles.orderCard} key={orders.indexOf(order)}>
              <img src={order.cakeOrderData.imageURL} alt="Cake" />
              <div>
                <h3>{order.cakeOrderData.name} <span>{order.cakeOrderData.size}</span> </h3>
                <div className={styles.orderInfo}>
                  <p>Massa: {order.cakeOrderData.batter}</p>
                  <p>Recheio(s): {order.cakeOrderData.fillings.join(',')}</p>
                </div>
                <div className={styles.orderPrice}>
                  <p>{priceFormat(order.cakeOrderData.price)}</p>
                  <GoTrashcan onClick={() => deleteFirebaseOrder(order.id)}/>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <form onSubmit={handleSubmit(onSubmitCompletedOrder)} className={styles.form}>
        <div>
          <h1>Dados</h1>

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
          </div >
          <div className={styles.deliveryDate}>
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
        </div>
        
        <div className={styles.payment}>
          <h1>Forma de Pagamento</h1>

            <div className={styles.paymentContent}>

              <div className={styles.paymentMethods}>
                <label htmlFor="cartao">
                  <input
                    {...register("payment")}
                    type="radio"
                    value='Cartão'
                    id='cartao'
                  />
                  <GoCreditCard />
                  Cartão
                </label>
              
                <label htmlFor="pix">
                  <input
                    {...register("payment")}
                    type="radio"
                    value="Pix"
                    id='pix'
                  />
                  <img src={pix}/>
                  Pix
                </label>
                <label htmlFor="dinheiro">
                  <input
                    {...register("payment")}
                    type="radio"
                    value="Dinheiro"
                    id='dinheiro'
                  />
                  <FaMoneyBill />
                  Dinheiro
                </label>
              </div>

              <div className={styles.totalPrice}>
                <h3>Preço total: </h3>
                <p>{priceFormat(totalPrice)}</p>
              </div>
              
            </div>
        </div>

        <button 
          type='submit'
          onClick={() => redirecionar}
        >Enviar pedido</button>
      </form>
    </>
  )
}