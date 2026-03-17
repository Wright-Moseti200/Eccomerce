import React, { useState, useEffect } from 'react'
import { products } from '../assets/assets'
import Card from '../components/Card'

const Collection = () => {

  const [filterProducts, setFilterProducts] = useState(products);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);


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
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' value={'Men'} onChange={toggleCategory} className='accent-black'/> Men</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' value={'Women'} onChange={toggleCategory} className='accent-black'/> Women</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' value={'Kids'} onChange={toggleCategory} className='accent-black'/> Kids</label>
              </div>
            </div>

            <div className='border border-gray-300 p-6 flex flex-col shadow-sm'>
              <h2 className='font-semibold text-gray-800 mb-4 text-lg'>TYPE</h2>
              <div className='flex flex-col gap-3 text-gray-600 text-base'>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' value={'Topwear'} onChange={toggleSubCategory} className='accent-black'/> Topwear</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} className='accent-black'/> Bottomwear</label>
                <label className='flex items-center gap-2 cursor-pointer'><input type='checkbox' value={'Winterwear'} onChange={toggleSubCategory} className='accent-black'/> Winterwear</label>
              </div>
            </div>  
          </aside>

          {/* Main Content - Products */}
          <div className='flex-1 flex flex-col'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
              <header className='text-3xl text-gray-900'>ALL <span className='font-semibold'>COLLECTIONS ___</span></header>
            </div>
            
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10'>
              {
                filterProducts.map((element, index)=>(
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
