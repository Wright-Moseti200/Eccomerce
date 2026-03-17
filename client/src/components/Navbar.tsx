import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Outlet,Link } from 'react-router-dom'
import Footer from './Footer'
import { Contextdata } from '../context/ContextProvider'
const Navbar = () => {
  const context = useContext(Contextdata);
  return (
    <>
    <nav className='flex w-full justify-around'>
      <img src={assets.logo} alt="Logo-image" className='h-12'/>
      <div className='flex w-1/4 justify-around items-center'>
        <p><Link to="/">HOME</Link></p>
        <p><Link to="/collection">COLLECTION</Link></p>
        <p><Link to="/about">ABOUT</Link></p>
        <p><Link to="/contact">CONTACT</Link></p>
      </div>
      <div className='flex items-center justify-around w-1/10 '>
        <img src={assets.search_icon} alt="search_icon" className='h-5'/>
        <img src={assets.profile_icon} alt="profile_icon" className='h-5'/>
        <div className='flex relative'>
        <Link to="/cart"><img src={assets.cart_icon} alt="cart_icon" className='h-5 relative'/>
          <span className='absolute left-2 top-2 h-5 text-[10px] w-5 text-center rounded-full bg-black text-white leading-5'>{context ? context.getcarttotal() : 0}</span>
          </Link>
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
