import { createContext, SetStateAction, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home"
import { MakeCake } from "../pages/MakeCake"
import { Bag } from "../pages/Bag"
import Layout from "./Layout";

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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/makecake" element={<MakeCake />}/>
          <Route path="/bag" element={<Bag />}/>
				</Route>
      </Routes>
    </CakeInfoContext.Provider>
  )
}