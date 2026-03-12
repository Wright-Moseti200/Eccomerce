import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>
    <section className='flex flex-col justify-center items-center mt-30 mb-20 text-center px-4'>
        <h1 className='font-bold text-3xl'>Subscribe now & get 20% off</h1>
        <p className='mt-3 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <div className='mt-8 flex w-full max-w-xl justify-center'>
            <input type="email" placeholder='Enter your email' className='px-4 py-3 outline-none border border-gray-300 w-full sm:w-2/3'/>
            <button className='bg-black text-white px-8 py-3 w-1/3 hover:bg-gray-800 transition-colors font-medium'>SUBSCRIBE</button>
        </div>
    </section>

    <section className='flex flex-col w-full'>
        <div className='flex justify-around '>
            <div>
                <img src={assets.logo} className='h-13'/>
                <p className='w-120 mt-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio alias praesentium quam quis impedit pariatur error minima autem repellat assumenda. Minima illum reprehenderit, nulla corporis laboriosam nesciunt maxime et ad.
                Harum animi dolor cupiditate aspernatur quidem! Quae officiis facilis voluptates magnam hic. Exercitationem repellendus esse aperiam amet, soluta ipsam dolorem magni ratione, voluptates eum autem fugiat qui a alias voluptatibus?</p>
            </div>
            <div>
                <h1 className='text-2xl font-semibold'>COMPANY</h1>
                <div className='mt-5 flex flex-col justify-around h-30'>
                    <p>Home</p>
                    <p>About us</p>
                    <p>Delivery</p>
                    <p>Privacy policy</p>
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-semibold'>GET IN TOUCH</h1>
                <div className='mt-5 flex flex-col justify-around h-15'>
                    <p>+254714471627</p>
                    <p>wrightgichana@gmail.com</p>
                </div>
            </div>
        </div>
        <p className='text-center mt-6 '>Copyright 2026@Wright.com - All Rights Reserved </p>
    </section>
    </>
  )
}

export default Footer
