import { useEffect, useState } from "react"

import { firestore } from "../../services/firebase"
import { OrderType } from "../Bag"

import styles from './styles.module.scss'
import { SignInButton } from "../../components/SignInButton"
import { CompletedOrder } from "./CompletedOrder.tsx"

export type CompletedOrderType = {
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

  return (
    <>
      <header className={styles.headerContainer}>
        <SignInButton/>
      </header>

      <div className={styles.dashboard}>
        <h1>Painel de Pedidos</h1>
        {completedOrders?.map((completedOrder) => (
          <CompletedOrder 
            completedOrder={completedOrder} 
            key={completedOrders.indexOf(completedOrder)}
          />          
        ))}
      </div>
    </>
  )
}