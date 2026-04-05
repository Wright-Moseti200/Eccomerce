
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between bg-white'>
        <div className='flex flex-col items-start'>
            <img className='w-[max(10%,80px)]' src={logo} alt="" />
            <p className='text-[10px] sm:text-xs text-pink-500 tracking-widest font-semibold mt-1'>ADMIN PANEL</p>
        </div>
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
