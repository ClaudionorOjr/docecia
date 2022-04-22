import { useEffect, useState } from "react"
import { dateFormat } from "../../helpers/dateFormat"
import { priceFormat } from "../../helpers/priceFormat"
import { firestore } from "../../services/firebase"
import { OrderType } from "../Bag"

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import styles from './styles.module.scss'

type CompletedOrderType = {
  orders: OrderType[],
  deliveryData: {
    pickupLocal: boolean,
    address: {
      street: string,
      streetNumber: string
    },
    date: Date,
    time: string
  },
  client: {
    name: string,
    idClient: string
  },
  phone: string,
  payment: string,
  totalPrice: number,
  createdAt: Date
}

export function Dashboard(){
  const [completedOrders, setCompletedOrder] = useState<CompletedOrderType[]>()
  const [active, setActive] = useState(false)

  const ToggleMode = () => {
    setActive(!active)
  }

  async function completedOrderQueryFirebase(){
    const completedOrderCollectionQuery = await firestore.collection("completedOrder").orderBy("createdAt").get()

    const docsData = completedOrderCollectionQuery.docs.map((doc) => {
      return doc.data() as CompletedOrderType
    })

    setCompletedOrder(docsData)
  }

  
  useEffect(()=>{
    completedOrderQueryFirebase()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function dateFirebase(date: {seconds: number, nanoseconds: number}){
    return new Date(date.seconds*1000)
  }

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        {completedOrders?.map((completedOrder) => (
          <div className={styles.completedOrderContainer} key={completedOrders.indexOf(completedOrder)}>

            <div className={styles.completedOrderContent}>

              <div className={styles.clientInfo}>
                <p>
                  <span>Cliente:</span> {completedOrder.client.name}
                </p>
                <p>
                  <span>Telefone:</span> {completedOrder.phone}
                </p>
              </div>

              <div className={styles.deliveryInfo}>
                <span>Entrega: </span>
              
                <div className={styles.streetInfo}>
                  {completedOrder.deliveryData.pickupLocal ? (
                    <span>Retirada no local</span>
                  ):(
                    <>
                      <p>
                        <span>Rua:</span> {completedOrder.deliveryData.address.street}
                      </p>
                      <p>
                        <span>Nº:</span> {completedOrder.deliveryData.address.streetNumber}
                      </p>
                    </>
                    )}
                </div>
              
                <div className={styles.dateInfo}>
                  <p>
                    <span>Data:</span> {dateFormat(dateFirebase((completedOrder.deliveryData.date) as any))}
                  </p>
                  {console.log(dateFirebase((completedOrder.deliveryData.date) as any))}
                  <p>
                    <span>Hora:</span> {completedOrder.deliveryData.time}
                  </p>
                </div>
              
              </div>

              <div className={styles.paymentInfo}>
                <p>
                  <span>Forma de pagamento:</span> {completedOrder.payment}
                </p>
                <p>
                  <span>Total:</span> {priceFormat(completedOrder.totalPrice)}
                </p>
              </div>

            </div>

            <div 
              className={styles.hidder} 
              onClick={(e) => {
                e.currentTarget.nextElementSibling?.classList.toggle('orderHidder')
                ToggleMode()
            }}>
              {active ? <IoIosArrowDown/> : <IoIosArrowUp/>}
            </div>
            
            <div className={`${styles.orderCardContainer} orderHidder`}>
                
              {completedOrder?.orders.map((order) => (
                <div className={styles.orderCardContent} key={completedOrder.orders.indexOf(order)} >

                  <div className={styles.orderCard}>
                    <img src={order.cakeOrderData.imageURL} alt="Cake" />

                    <div>
                      <h3>{order.cakeOrderData.name} <span>{order.cakeOrderData.size}</span> </h3>
                      <div className={styles.orderInfo}>
                        <p>Massa: {order.cakeOrderData.batter}</p>
                        <p>Recheio(s): {order.cakeOrderData.fillings.join(',')}</p>
                      </div>
                      <div className={styles.orderPrice}>
                        <p>{priceFormat(order.cakeOrderData.price)}</p>
                      </div>

                    </div>
                  </div>

                  {order.cakeOrderData.note && <p className={styles.noteInfo}> Observação: {order.cakeOrderData.note} </p>}
                </div>
              ))}
            </div>
          
          </div>
        ))}
      </div>
    </>
  )
}