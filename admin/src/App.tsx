import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

function App() {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Navbar />
      <hr />
      
      <div className='flex flex-1 w-full'>
        <Sidebar />
        
        <div className='flex-1 mx-auto max-w-7xl px-4 md:px-8 my-8 text-gray-600 text-sm md:text-base'>
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
      
    </div>
  )
}

export default App
