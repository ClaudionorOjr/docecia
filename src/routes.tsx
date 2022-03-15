import { Routes, Route } from "react-router-dom";

import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { MakeCake } from "./pages/MakeCake";
import { Header } from "./components/Header";
import { Bag } from "./pages/Bag";
import { createContext, SetStateAction, useState } from "react";


type CakeInfoType = {
  name: string
  size: string
  price: number
}

type CakeInfoContextType = {
  testData: CakeInfoType | undefined
  setTestData: React.Dispatch<SetStateAction<CakeInfoType | undefined>>
}

export const CakeInfoContext = createContext({} as CakeInfoContextType)

export function AppRoutes(){
  const [testData, setTestData] = useState<CakeInfoType>()

  return (
    <CakeInfoContext.Provider value={{testData, setTestData}}>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Menu />
          </>
        }/>
        <Route path="/makecake" element={<MakeCake />}/>
        <Route path="/bag" element={<Bag />}/>
      </Routes>
    </CakeInfoContext.Provider>
  )
}