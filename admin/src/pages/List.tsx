import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

const List = () => {
  const context = useContext(AdminContext);
  const products = context?.products || [];

  return (
    <>
      <p className='mb-2 text-gray-700'>All Products List</p>
      <div className='flex flex-col gap-2'>
        
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
        </div>
        
        {/* Table rows */}
        {products.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <img src={item.image && item.image.length > 0 ? item.image[0] : ''} className='w-12 h-12 bg-gray-200 object-cover' alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Ksh {item.price}</p>
                <p onClick={() => context?.deleteProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700'>X</p>
            </div>
        ))}

      </div>
    </>
  )
}

export default List
