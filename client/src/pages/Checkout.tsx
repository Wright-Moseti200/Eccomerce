import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Checkout = () => {

  const [method, setMethod] = useState('cod');

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-20'>
      
      {/* ------------- Left Side: Delivery Information ------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-xl sm:text-2xl my-3'>
          <h1 className='text-2xl text-gray-900'>DELIVERY <span className='font-semibold'>INFORMATION ___</span></h1>
        </div>
        
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='First name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='Last name' />
        </div>
        
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="email" placeholder='Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='Street' />
        
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='State' />
        </div>
        
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="number" placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='Country' />
        </div>
        
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="number" placeholder='Phone' />
      </div>

      {/* ------------- Right Side: Totals & Payment ------------- */}
      <div className='mt-8 sm:mt-0'>
        
        <div className='mt-8 min-w-80'>
          <div className='text-2xl'>
            <h1 className='text-2xl text-gray-900'>CART <span className='font-semibold'>TOTALS ___</span></h1>
          </div>
          <div className='flex flex-col gap-2 mt-2 text-[15px] sm:text-base'>
            <div className='flex justify-between py-3 border-b'>
              <p>Subtotal</p>
              <p>$ 294.00</p>
            </div>
            <div className='flex justify-between py-3 border-b'>
              <p>Shipping Fee</p>
              <p>$ 10.00</p>
            </div>
            <div className='flex justify-between py-3'>
              <b className='text-lg'>Total</b>
              <b className='text-lg'>$ 304.00</b>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <div className='text-base sm:text-lg mb-3'>
            <h2 className='text-gray-900'>PAYMENT <span className='font-semibold'>METHOD ___</span></h2>
          </div>
          
          <div className='flex flex-col lg:flex-row gap-3'>
            <div onClick={()=>setMethod('stripe')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'stripe' ? 'border-black' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'razorpay' ? 'border-black' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={()=>setMethod('cod')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'cod' ? 'border-black' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4 uppercase'>Cash on delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors uppercase font-medium'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
