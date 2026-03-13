import React from 'react'
import { assets, products } from '../assets/assets'

const Cart = () => {

  // Mock initial cart items using the first three products to display the UI
  const cartItems = products.slice(0, 3).map((p, i) => ({
    ...p,
    size: ['M', 'S', 'XL'][i], // mock sizes from screenshot
    quantity: [2, 1, 1][i]     // mock quantities from screenshot
  }))

  return (
    <>
      <main className='mt-17 mb-20 flex justify-center w-full'>
        <div className='flex flex-col w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          
          <div className='text-2xl mb-5'>
            <h1 className='text-2xl text-gray-500'>YOUR <span className='text-gray-900 font-medium'>CART <span className='w-8 md:w-12 h-[2px] bg-gray-700 inline-block align-middle'></span></span></h1>
          </div>

          <section className='flex flex-col'>
            {cartItems.map((item, index) => (
              <div key={index} className={`py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ${index === cartItems.length - 1 ? 'border-b' : ''}`}>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                  <div>
                    <p className='text-xs sm:text-lg font-medium text-gray-700'>{item.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>${item.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                
                <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 outline-none appearance-none text-center' type='number' min={1} defaultValue={item.quantity} />
                
                <img className='w-4 sm:w-5 cursor-pointer hover:opacity-75 transition-opacity justify-self-end' src={assets.bin_icon} alt="delete" />
              </div>
            ))}
          </section>

          <section className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <div className='text-2xl mb-3'>
                <h1 className='text-2xl text-gray-500'>CART <span className='text-gray-900 font-medium'>TOTALS <span className='w-8 md:w-12 h-[2px] bg-gray-700 inline-block align-middle'></span></span></h1>
              </div>

              <div className='flex flex-col gap-2 mt-2 text-[15px] sm:text-base'>
                <div className='flex justify-between py-3 border-b'>
                  <p className='text-gray-600'>Subtotal</p>
                  <p className='font-medium'>$ 294.00</p>
                </div>
                <div className='flex justify-between py-3 border-b'>
                  <p className='text-gray-600'>Shipping Fee</p>
                  <p className='font-medium'>$ 10.00</p>
                </div>
                <div className='flex justify-between py-3 font-bold'>
                  <p>Total</p>
                  <p>$ 304.00</p>
                </div>
              </div>

              <div className='w-full text-right mt-8'>
                <button className='bg-black text-white px-8 py-3 w-full sm:w-auto hover:bg-gray-800 transition-colors uppercase text-sm font-medium'>
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </section>

        </div>
      </main>
    </>
  )
}

export default Cart
