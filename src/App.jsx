import { Route, Routes } from "react-router-dom"

import Home from "./components/Home"
import Detail from "./components/Cards/Detail"


function App(){
  return (
   <div className="text-white">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:id" element={<Detail/>}/>
    </Routes>
   </div>
  )
}

export default App
