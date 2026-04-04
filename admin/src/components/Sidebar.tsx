import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-16 md:w-[18%] min-h-screen border-r border-gray-200 bg-white'>
        <div className='flex flex-col gap-4 pt-6 md:pl-[20%] text-[15px]'>

            <NavLink className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 border border-gray-300 md:border-r-0 py-2 md:px-3 mx-2 md:mx-0 rounded md:rounded-r-none md:rounded-l ${isActive ? 'bg-[#ffebf0] border-pink-300 md:!border-r-4 md:!border-r-pink-500' : ''}`} to="/add">
                <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 border border-gray-300 md:border-r-0 py-2 md:px-3 mx-2 md:mx-0 rounded md:rounded-r-none md:rounded-l ${isActive ? 'bg-[#ffebf0] border-pink-300 md:!border-r-4 md:!border-r-pink-500' : ''}`} to="/list">
                <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 border border-gray-300 md:border-r-0 py-2 md:px-3 mx-2 md:mx-0 rounded md:rounded-r-none md:rounded-l ${isActive ? 'bg-[#ffebf0] border-pink-300 md:!border-r-4 md:!border-r-pink-500' : ''}`} to="/orders">
                <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>
    </div>
  )
}
export default Sidebar
