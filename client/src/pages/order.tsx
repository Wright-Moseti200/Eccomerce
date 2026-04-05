import { useContext, useEffect, useState } from 'react'
import { Contextdata } from '../context/ContextProvider'

const Order = () => {
  const context = useContext(Contextdata);
  const [orderData, setOrderData] = useState<any[]>([]);

  const fetchOrders = async () => {
    if (context) {
      const orders = await context.getOrders();
      // Reverse to show latest first
      setOrderData([...orders].reverse());
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [context]);

  // Ensure products are available
  const products = context?.products || [];

  return (
    <div className='pt-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-20'>

      <div className='text-2xl mb-8'>
        <h1 className='text-2xl text-gray-500'>MY <span className='text-gray-900 font-medium'>ORDERS <span className='w-8 md:w-12 h-[2px] bg-gray-700 inline-block align-middle'></span></span></h1>
      </div>

      <div className='flex flex-col gap-8'>
        {orderData.length === 0 ? (
           <p className='text-gray-500'>You have no active orders.</p>
        ) : (
          orderData.map((order, orderIndex) => (
            <div key={orderIndex} className='border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white'>
              
              {/* Order Header Block */}
              <div className='bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                 <div className='flex flex-col'>
                    <div className='flex items-center gap-3'>
                       <h2 className='font-bold text-lg text-gray-900'>Order #{order._id?.slice(-8).toUpperCase()}</h2>
                       <div className='px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-2 tracking-wide'>
                           <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                           {order.status}
                       </div>
                    </div>
                    <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                        <p>Date: <span className='text-gray-900 font-medium'>{new Date(Number(order.date)).toDateString()}</span></p>
                        <p>Payment: <span className='text-gray-900 font-medium'>{order.payment_method}</span></p>
                    </div>
                 </div>
                 
                 <div>
                    <button onClick={fetchOrders} className='border border-gray-300 px-5 py-2 text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm'>
                      Track Order
                    </button>
                 </div>
              </div>

              {/* Order Items Block */}
              <div className='flex flex-col p-6'>
                {order.cartdata.map((item: any, itemIndex: number) => {
                  const productDetails = products.find(p => p._id === item.id);
                  if (!productDetails) return null;

                  return (
                    <div key={itemIndex} className='flex flex-col'>
                        <div className='flex items-center gap-6 py-4'>
                        <img className='w-20 sm:w-24 object-cover rounded-md border border-gray-100 shadow-sm' src={productDetails.image ? productDetails.image[0] : ""} alt={productDetails.name} />
                        <div className='flex-1'>
                            <p className='text-base sm:text-lg font-bold text-gray-900'>{productDetails.name}</p>
                            <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                                <p className='font-semibold text-gray-900'>Ksh {productDetails.price}</p>
                                <p className='px-2 py-0.5 bg-gray-100 rounded text-gray-700'>Qty: {item.quantity}</p>
                                <p className='px-2 py-0.5 bg-gray-100 rounded text-gray-700'>Size: {productDetails.sizes ? productDetails.sizes[item.sizeindex] : 'N/A'}</p>
                            </div>
                        </div>
                        </div>
                        {itemIndex !== order.cartdata.length - 1 && <hr className='border-gray-100 my-2' />}
                    </div>
                  );
                })}
              </div>
              
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Order
