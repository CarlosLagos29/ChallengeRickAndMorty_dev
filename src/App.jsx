import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Detail from "./components/Cards/Detail";
import Error404 from "./components/Error404";

function App(){
  return (
   <div className="text-white font-Permanent_Marker font-extrabold text-xl">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="*" element={<Error404/>}/>
    </Routes>
   </div>
  )
};

export default App;
