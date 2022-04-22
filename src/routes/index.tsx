import { createContext, SetStateAction, useState } from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import { Home } from "../pages/Home"
import { MakeCake } from "../pages/MakeCake"
import { Bag } from "../pages/Bag"
import { Dashboard } from "../pages/Dashboard";
import { ScrollToTop } from "../components/ScrollToTop";

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
      <ScrollToTop />
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/makecake" element={<MakeCake />}/>
          <Route path="/bag" element={<Bag />}/>
				</Route>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </CakeInfoContext.Provider>
  )
}