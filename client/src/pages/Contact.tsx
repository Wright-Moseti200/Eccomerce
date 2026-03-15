import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <>
    <main className='mt-17 mb-20'>
      <header className='mt-15 text-center text-3xl'>CONTACT <span className='font-semibold'>US ___</span></header>
      
      <section className='flex flex-col md:flex-row justify-center mt-15 gap-10 md:gap-20 px-4 md:px-0'>
        <img src={assets.contact_img} className='h-auto w-full md:max-w-md object-cover shadow-sm' alt="Contact Us"/>
        
        <div className='w-full md:w-1/2 flex flex-col justify-center gap-8 text-gray-700'>
          
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-gray-900 text-xl'>Our Store</h2>
            <p className='text-gray-600'>80100 Mombasa Kenya</p>
            <p className='text-gray-600'>Suite 350, Mombasa Kenya</p>
            <p className='text-gray-600 mt-2'>Tel: +254714471627</p>
            <p className='text-gray-600'>Email: wrightgichana@gmail.com</p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-gray-900 text-xl'>Careers at Forever</h2>
            <p className='text-gray-600'>Learn more about our teams and job openings.</p>
            <button className='mt-4 border border-black text-black px-8 py-3 w-48 hover:bg-black hover:text-white transition-colors duration-300'>Explore Jobs</button>
          </div>

        </div>
      </section>
      
    </main>
    </>
  )
}

export default Contact
