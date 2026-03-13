import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <>
    <main className='mt-17 mb-20'>
      <header className='mt-15 text-center text-3xl '>ABOUT <span className='font-semibold'>US ___</span></header>
      
      <section className='flex flex-col md:flex-row justify-center mt-15 gap-10 md:gap-20 px-4 md:px-0'>
        <img src={assets.about_img} className='h-auto w-full md:max-w-md object-cover shadow-sm' alt="About Us"/>
        
        <div className='w-full md:w-1/2 flex flex-col justify-center gap-6 text-gray-700'>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores porro, voluptate sint eos quia quod perspiciatis illo, molestiae id numquam repellat aperiam at non inventore, aspernatur quis reiciendis. Veritatis, nostrum!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi beatae suscipit similique sint aliquid dolore natus! Eos quod, quos adipisci voluptates doloremque placeat quisquam, officia dicta ab reprehenderit ipsam possimus.
          </p>
          
          <h1 className='font-bold text-gray-900 mt-2 text-xl'>Our Mission</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum harum officia hic in voluptatem. Beatae nam, ipsum dolorem dignissimos culpa quas officiis animi repudiandae sapiente nemo inventore at voluptate cum.
          </p>
        </div>
      </section>

      <section className='mt-24 px-4 md:px-20'>
        <header className='mb-15 text-center text-3xl'>____ WHY <span className='font-semibold'>CHOOSE US</span> ____</header>
        
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='border border-gray-300 px-10 py-16 flex flex-col gap-5 text-center items-center hover:shadow-md transition-shadow cursor-default'>
            <h2 className='font-bold text-gray-900 text-xl'>Quality Assurance:</h2>
            <p className='text-gray-600 text-base leading-relaxed'>
              We meticulously select and vet each product to ensure it meets our stringent quality standards.
            </p>
          </div>
          
          <div className='border border-gray-300 px-10 py-16 flex flex-col gap-5 text-center items-center hover:shadow-md transition-shadow cursor-default'>
            <h2 className='font-bold text-gray-900 text-xl'>Convenience:</h2>
            <p className='text-gray-600 text-base leading-relaxed'>
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
            </p>
          </div>
          
          <div className='border border-gray-300 px-10 py-16 flex flex-col gap-5 text-center items-center hover:shadow-md transition-shadow cursor-default'>
            <h2 className='font-bold text-gray-900 text-xl'>Exceptional Customer Service:</h2>
            <p className='text-gray-600 text-base leading-relaxed'>
              Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </section>
      
    </main>
    </>
  )
}

export default About

