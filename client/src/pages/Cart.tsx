import React, { useContext, useEffect, useState } from 'react'
import { assets, products } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Contextdata } from '../context/ContextProvider'

const Cart = () => {

  const context = useContext(Contextdata);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (context) {
      const tempData: any[] = [];
      context.cart.forEach(item => {
        const productData = products.find(product => product._id === item.id);
        if (productData) {
          tempData.push({
            ...productData,
            size: productData.sizes[item.sizeindex],
            sizeindex: item.sizeindex,
            quantity: item.quantity
          });
        }
      });
      setCartItems(tempData);
    }
  }, [context?.cart]);

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
                      <p>Ksh {item.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                
                <div className='flex items-center gap-4 justify-between w-full'>
                  <input onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) context?.updatecart(item._id, val, item.sizeindex)
                  }} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 outline-none appearance-none text-center' type='number' min={1} defaultValue={item.quantity} />
                  
                  <p className='font-medium text-sm sm:text-base hidden sm:block'>Ksh {item.price * item.quantity}</p>
                </div>
                
                <img onClick={() => context?.removefromcart(item._id)} className='w-4 sm:w-5 cursor-pointer hover:opacity-75 transition-opacity justify-self-end' src={assets.bin_icon} alt="delete" />
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
                  <p className='font-medium'>Ksh {context ? context.gettotalamount() : 0}.00</p>
                </div>
                <div className='flex justify-between py-3 border-b'>
                  <p className='text-gray-600'>Shipping Fee</p>
                  <p className='font-medium'>Ksh {context && context.gettotalamount() > 0 ? context.delivery_fee : 0}.00</p>
                </div>
                <div className='flex justify-between py-3 font-bold'>
                  <p>Total</p>
                  <p>Ksh {context && context.gettotalamount() > 0 ? context.gettotalamount() + context.delivery_fee : 0}.00</p>
                </div>
              </div>

              <div className='w-full text-right mt-8'>
                <button onClick={() => navigate('/checkout')} className='bg-black text-white px-8 py-3 w-full sm:w-auto hover:bg-gray-800 transition-colors uppercase text-sm font-medium'>
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
