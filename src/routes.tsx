import { Routes, Route } from "react-router-dom";

import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { MakeCake } from "./pages/MakeCake";
import { Header } from "./components/Header";

export function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header />
          <Home />
          <Menu />
        </>
      }/>
      <Route path="/makecake" element={<MakeCake />}/>
    </Routes>
  )
}