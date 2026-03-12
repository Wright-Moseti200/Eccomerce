import React from 'react'
import {assets} from '../assets/assets'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
const Navbar = () => {
  return (
    <>
    <nav className='flex w-full justify-around'>
      <img src={assets.logo} alt="Logo-image" className='h-12'/>
      <div className='flex w-1/4 justify-around items-center'>
        <p>HOME</p>
        <p>COLLECTION</p>
        <p>ABOUT</p>
        <p>CONTACT</p>
      </div>
      <div className='flex items-center justify-around w-1/10 '>
        <img src={assets.search_icon} alt="search_icon" className='h-5'/>
        <img src={assets.profile_icon} alt="profile_icon" className='h-5'/>
        <div className='flex relative'>
          <img src={assets.cart_icon} alt="cart_icon" className='h-5 relative'/>
          <span className='absolute left-2 top-2 h-5 w-5 text-center rounded-full bg-black text-white'>0</span>
        </div>
      </div>
      </nav> 
      <Outlet/>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default Navbar
