import { useState } from 'react'

import { dateFormat } from '../../../helpers/dateFormat'
import { priceFormat } from '../../../helpers/priceFormat'
import { CompletedOrderType } from '..'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './styles.module.scss'

type completedOrderProps = {
  completedOrder: CompletedOrderType
}

export function CompletedOrder({completedOrder}: completedOrderProps){
  const [active, setActive] = useState(false)

  function dateFirebase(date: {seconds: number, nanoseconds: number}){
    return new Date(date.seconds*1000)
  }
  
  return (
    <div className={styles.completedOrderContainer}>

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
          // e.currentTarget.nextElementSibling?.classList.toggle('orderHidder')
          setActive(!active)
      }}>
        {active ? <IoIosArrowDown/> : <IoIosArrowUp/>}
      </div>
      
      <div className={`${styles.orderCardContainer} ${!active && `orderHidder`}`}>
          
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
  )
}