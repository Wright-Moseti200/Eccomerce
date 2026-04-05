import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        
        <div>
            <img src={assets.logo} className='h-[35px] sm:h-[45px] mb-5'/>
            <p className='w-full md:w-2/3 text-gray-600 leading-relaxed text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio alias praesentium quam quis impedit pariatur error minima autem repellat assumenda. Minima illum reprehenderit, nulla corporis laboriosam nesciunt maxime et ad.
            Harum animi dolor cupiditate aspernatur quidem! Quae officiis facilis voluptates magnam hic.
            </p>
        </div>
        
        <div>
            <h1 className='text-xl font-bold mb-5 text-gray-800'>COMPANY</h1>
            <div className='flex flex-col gap-2 text-gray-600'>
                <p className='cursor-pointer hover:text-black'>Home</p>
                <p className='cursor-pointer hover:text-black'>About us</p>
                <p className='cursor-pointer hover:text-black'>Delivery</p>
                <p className='cursor-pointer hover:text-black'>Privacy policy</p>
            </div>
        </div>

        <div>
            <h1 className='text-xl font-bold mb-5 text-gray-800'>GET IN TOUCH</h1>
            <div className='flex flex-col gap-2 text-gray-600'>
                <p>+254714471627</p>
                <p>wrightgichana@gmail.com</p>
            </div>
        </div>

    </div>

    <div>
        <hr className='border-gray-200' />
        <p className='text-center py-5 text-sm font-medium text-gray-600'>Copyright 2026@Wright.com - All Rights Reserved</p>
    </div>
    </>
  )
}

export default Footer
