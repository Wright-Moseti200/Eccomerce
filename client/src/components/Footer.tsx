import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>


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
