import React from 'react'
import { products } from '../assets/assets'
import Card from '../components/Card'

const Collection = () => {
  return (
    <>
    <main className='flex flex-col w-full justify-center items-center mt-17 mb-20'>
      <section className='flex flex-col w-full max-w-7xl px-4'>
        <div className='flex flex-col md:flex-row gap-10 mt-10 w-full'>
          
          {/* Sidebar - Filters */}
          <aside className='w-full md:w-1/4 flex flex-col gap-6'>
            <h1 className='text-2xl font-bold text-gray-900'>FILTERS</h1>
            
            <div className='border border-gray-300 p-6 flex flex-col shadow-sm'>
              <h2 className='font-semibold text-gray-800 mb-4 text-lg'>CATEGORIES</h2>
              <div className='flex flex-col gap-3 text-gray-600 text-base'>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' className='accent-black'/> Men</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' className='accent-black'/> Women</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' className='accent-black'/> Kids</label>
              </div>
            </div>

            <div className='border border-gray-300 p-6 flex flex-col shadow-sm'>
              <h2 className='font-semibold text-gray-800 mb-4 text-lg'>TYPE</h2>
              <div className='flex flex-col gap-3 text-gray-600 text-base'>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' className='accent-black'/> Topwear</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' className='accent-black'/> Bottomwear</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' className='accent-black'/> Winterwear</label>
              </div>
            </div>  
          </aside>

          {/* Main Content - Products */}
          <div className='flex-1 flex flex-col'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
              <header className='text-3xl text-gray-900'>ALL <span className='font-semibold'>COLLECTIONS ___</span></header>
              <select className='border border-gray-300 px-4 py-2 text-sm text-gray-700 outline-none hover:border-gray-400 bg-white'>
                <option>Sort by: Relevant</option>
                <option>Sort by: Low to High</option>
                <option>Sort by: High to Low</option>
              </select>
            </div>
            
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10'>
              {
                products.map((element, index)=>(
                 <Card
                 key={index}
                 id={element._id}
                 name={element.name}
                 image={element.image[0]}
                 price={element.price}
                 />
                ))
              }
            </div>
          </div>

        </div>
      </section>  
    </main> 
    </>
  )
}

export default Collection
