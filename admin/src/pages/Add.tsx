import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

const Add = () => {
    const context = useContext(AdminContext);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState<string[]>([]);
    
    const [image1, setImage1] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [image3, setImage3] = useState<File | null>(null);
    const [image4, setImage4] = useState<File | null>(null);

    const toggleSize = (size: string) => {
        setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
    }

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const dataTransfer = new DataTransfer();
        if(image1) dataTransfer.items.add(image1);
        if(image2) dataTransfer.items.add(image2);
        if(image3) dataTransfer.items.add(image3);
        if(image4) dataTransfer.items.add(image4);

        if (dataTransfer.files.length === 0) {
            alert("Please upload at least 1 image");
            return;
        }

        let success = await context?.addProducts({
            name,
            description,
            price: Number(price),
            category,
            subcategory: subCategory,
            sizes,
            bestseller,
            images: dataTransfer.files
        });
        
        if (success) {
            setName('');
            setDescription('');
            setPrice('');
            setSizes([]);
            setBestseller(false);
            setImage1(null); setImage2(null); setImage3(null); setImage4(null);
            alert("Product added successfully");
        } else {
            alert("Failed to add product");
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4'>
        <div>
            <p className='mb-2'>Upload Image</p>
            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20 object-cover cursor-pointer' src={!image1 ? "" : URL.createObjectURL(image1)} alt="" />
                    {!image1 && (
                        <div className='w-20 h-20 border-2 border-gray-300 border-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50'>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <p className='text-xs text-gray-400 mt-1'>Upload</p>
                        </div>
                    )}
                    <input onChange={(e)=>setImage1(e.target.files?.[0] || null)} type="file" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                    <img className='w-20 object-cover cursor-pointer' src={!image2 ? "" : URL.createObjectURL(image2)} alt="" />
                    {!image2 && (
                        <div className='w-20 h-20 border-2 border-gray-300 border-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50'>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <p className='text-xs text-gray-400 mt-1'>Upload</p>
                        </div>
                    )}
                    <input onChange={(e)=>setImage2(e.target.files?.[0] || null)} type="file" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                    <img className='w-20 object-cover cursor-pointer' src={!image3 ? "" : URL.createObjectURL(image3)} alt="" />
                    {!image3 && (
                        <div className='w-20 h-20 border-2 border-gray-300 border-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50'>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <p className='text-xs text-gray-400 mt-1'>Upload</p>
                        </div>
                    )}
                    <input onChange={(e)=>setImage3(e.target.files?.[0] || null)} type="file" id="image3" hidden />
                </label>
                <label htmlFor="image4">
                    <img className='w-20 object-cover cursor-pointer' src={!image4 ? "" : URL.createObjectURL(image4)} alt="" />
                    {!image4 && (
                        <div className='w-20 h-20 border-2 border-gray-300 border-dashed flex flex-col items-center justify-center cursor-pointer bg-gray-50'>
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <p className='text-xs text-gray-400 mt-1'>Upload</p>
                        </div>
                    )}
                    <input onChange={(e)=>setImage4(e.target.files?.[0] || null)} type="file" id="image4" hidden />
                </label>
            </div>
        </div>

        <div className='w-full sm:w-[500px] mt-2'>
            <p className='mb-2'>Product name</p>
            <input value={name} onChange={(e)=>setName(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded outline-none text-gray-700' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full sm:w-[500px] mt-2'>
            <p className='mb-2'>Product description</p>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded outline-none text-gray-700' placeholder='Write content here' rows={4} required />
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2 w-full'>
            <div>
                <p className='mb-2'>Product category</p>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded outline-none text-gray-600'>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
            <div>
                <p className='mb-2'>Sub category</p>
                <select value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded outline-none text-gray-600'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
            </div>
            <div>
                <p className='mb-2'>Product Price</p>
                <input value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px] border border-gray-300 rounded outline-none text-gray-700' type="number" placeholder='25' required />
            </div>
        </div>

        <div className='mt-2'>
            <p className='mb-2'>Product Sizes</p>
            <div className='flex gap-3'>
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <div onClick={()=>toggleSize(size)} key={size} className={`${sizes.includes(size) ? 'bg-orange-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer text-gray-700 rounded-sm`}>{size}</div>
                ))}
            </div>
        </div>

        <div className='flex gap-2 mt-2 items-center'>
            <input type="checkbox" onChange={(e)=>setBestseller(e.target.checked)} checked={bestseller} id="bestseller" className='cursor-pointer w-4 h-4' />
            <label className='cursor-pointer text-gray-700 mt-0.5' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button className='w-28 py-3 mt-4 bg-black text-white rounded' type='submit'>ADD</button>
    </form>
  )
}

export default Add
