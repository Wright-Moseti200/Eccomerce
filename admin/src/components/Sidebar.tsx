import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-white'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-[#ffebf0] border-pink-300 !border-r-4 !border-r-pink-500' : ''}`} to="/add">
                <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-[#ffebf0] border-pink-300 !border-r-4 !border-r-pink-500' : ''}`} to="/list">
                <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-[#ffebf0] border-pink-300 !border-r-4 !border-r-pink-500' : ''}`} to="/orders">
                <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>
    </div>
  )
}
export default Sidebar
