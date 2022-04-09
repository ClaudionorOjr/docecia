import { createContext, SetStateAction, useState } from "react";

import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home"
import { MakeCake } from "../pages/MakeCake"
import { Bag } from "../pages/Bag"
import Layout from "./Layout";
import { Header } from "../components/Header";

type CakeInfoType = {
  imageURL: string
  name: string
  size: string
  price: number
}

type CakeInfoContextType = {
  cakeInfo: CakeInfoType | undefined
  setCakeInfo: React.Dispatch<SetStateAction<CakeInfoType | undefined>>
}

export const CakeInfoContext = createContext({} as CakeInfoContextType)

export function AppRoutes(){
  const [cakeInfo, setCakeInfo] = useState<CakeInfoType>()

  return (
    <CakeInfoContext.Provider value={{cakeInfo, setCakeInfo}}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/makecake" element={<MakeCake />}/>
          <Route path="/bag" element={<Bag />}/>
				</Route>
      </Routes>
    </CakeInfoContext.Provider>
  )
}