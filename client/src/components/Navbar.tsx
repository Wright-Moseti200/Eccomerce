import { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Outlet,Link, NavLink } from 'react-router-dom'
import Footer from './Footer'
import { Contextdata } from '../context/ContextProvider'
import {useUser,useClerk,SignedIn,SignedOut,UserButton} from "@clerk/clerk-react";

const Navbar = () => {
  const context = useContext(Contextdata);
  const {openSignIn} = useClerk();
  const [visible, setVisible] = useState(false);

  return (
    <>
    <nav className='flex w-full items-center justify-between py-5 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Link to="/"><img src={assets.logo} alt="Logo-image" className='h-[35px] sm:h-[45px]'/></Link>
      
      <div className='hidden md:flex gap-8 items-center text-sm lg:text-base font-medium text-gray-700'>
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </div>

      <div className='flex items-center gap-4 sm:gap-6'>
        <img src={assets.search_icon} alt="search_icon" className='h-5 cursor-pointer'/>
        <div className='group relative'>
          <SignedOut>
             <img src={assets.profile_icon} alt="profile_icon" className='h-5 cursor-pointer' onClick={() => openSignIn()}/>
          </SignedOut>
          <SignedIn>
             <UserButton />
          </SignedIn>
        </div>
        <Link to="/cart" className='relative'>
          <img src={assets.cart_icon} alt="cart_icon" className='h-5 relative cursor-pointer'/>
          <span className='absolute -right-2 -bottom-2 h-4 w-4 bg-black text-white aspect-square rounded-full text-[8px] flex justify-center items-center'>{context ? context.getcarttotal() : 0}</span>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='h-5 cursor-pointer md:hidden' alt="menu icon" />
      </div>

      {/* Sidebar Menu for Mobile */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full z-50' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-5 py-6 cursor-pointer text-gray-800 bg-gray-50 border-b border-gray-200'>
                <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="back" />
                <p className='font-bold'>Back</p>
            </div>
            <div className='flex flex-col font-medium py-4 px-2 space-y-2'>
              <NavLink onClick={() => setVisible(false)} to="/" className="py-3 pl-6 border-b hover:bg-gray-50">HOME</NavLink>
              <NavLink onClick={() => setVisible(false)} to="/collection" className="py-3 pl-6 border-b hover:bg-gray-50">COLLECTION</NavLink>
              <NavLink onClick={() => setVisible(false)} to="/about" className="py-3 pl-6 border-b hover:bg-gray-50">ABOUT</NavLink>
              <NavLink onClick={() => setVisible(false)} to="/contact" className="py-3 pl-6 border-b hover:bg-gray-50">CONTACT</NavLink>
            </div>
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
