import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Productpage from './pages/Productpage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Homepage/>}/>
      <Route path="collection" element={<Collection/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="/product/:productid" element={<Productpage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
