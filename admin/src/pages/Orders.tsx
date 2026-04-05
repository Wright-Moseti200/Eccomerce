import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

const Orders = () => {
    const context = useContext(AdminContext);
    const orders = context?.orders || [];
    const products = context?.products || [];

    const getProductName = (id: string) => {
        let p = products.find(prod => prod._id === id);
        return p ? p.name : 'Unknown Product';
    }
    const getProductSize = (id: string, index: number) => {
        let p = products.find(prod => prod._id === id);
        return p && p.sizes ? p.sizes[index] : '';
    }

  return (
    <div>
        <h3 className='text-gray-500 text-lg mb-4'>Order Page</h3>
        <div>
            {orders.map((item, index) => (
                <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 bg-white'>
                    <svg className='w-12 h-12 text-gray-500' fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    <div>
                        <div>
                            {item.cartdata && item.cartdata.map((i: any, idx: number) => (
                                <p className='py-0.5' key={idx}>{getProductName(i.id)} x {i.quantity} <span> {getProductSize(i.id, i.sizeindex)}</span>{idx !== item.cartdata.length - 1 ? ',' : ''}</p>
                            ))}
                        </div>
                        {item.address && (
                            <>
                                <p className='mt-3 mb-2 font-medium'>{item.address.firstName} {item.address.lastName}</p>
                                <div>
                                    <p>{item.address.street},</p>
                                    <p>{item.address.city}, {item.address.state}, {item.address.country}, {item.address.zipcode}</p>
                                </div>
                                <p className='mt-1'>{item.address.phone}</p>
                            </>
                        )}
                    </div>

                    <div>
                        <p className='text-sm sm:text-[15px]'>Items : {item.cartdata ? item.cartdata.length : 0}</p>
                        <p className='mt-3'>Method : {item.payment_method}</p>
                        <p>Payment : {item.payment ? 'Done' : 'Pending'}</p>
                        <p>Date : {new Date(item.date).toLocaleDateString()}</p>
                    </div>

                    <p className='text-sm sm:text-[15px]'>Ksh {item.amount}</p>

                    <select value={item.status} onChange={(e) => context?.updateStatus(item._id, e.target.value)} className='p-2 font-semibold border bg-white outline-none'>
                        <option value="Processing">Processing</option>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders
