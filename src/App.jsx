import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
export default function App() {
  return (
    <> 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
            
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
