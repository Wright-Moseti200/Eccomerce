import React, { useContext } from 'react'
import { Contextdata } from '../context/ContextProvider'

const Order = () => {
  const context = useContext(Contextdata);
  const products = context?.products || [];
  const orderData = products.slice(1, 4);

  return (
    <div className='pt-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-20'>

      <div className='text-2xl mb-8'>
        <h1 className='text-2xl text-gray-500'>MY <span className='text-gray-900 font-medium'>ORDERS <span className='w-8 md:w-12 h-[2px] bg-gray-700 inline-block align-middle'></span></span></h1>
      </div>

      <div className='flex flex-col'>
        {orderData.map((item, index) => (
          <div key={index} className={`py-6 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${index === orderData.length - 1 ? 'border-b' : ''}`}>
            
            <div className='flex items-start gap-6 text-sm flex-1'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
              <div>
                <p className='text-xs sm:text-lg font-medium text-gray-700'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p className='text-lg'>${item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: {item.sizes[0]}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-400'>Fri Aug 16 2024</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-400'>COD</span></p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Out for delivery</p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm border-gray-300 hover:bg-slate-50 transition-colors'>
                Track Order
              </button>
            </div>
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default Order
