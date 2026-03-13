/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { assets ,products } from '../assets/assets';
import { useEffect, useState } from 'react';

const Productpage = () => {
  const {productid} = useParams();
  const [product,setproduct] = useState<any[]>();
  const [index,setindex] = useState(0)

  useEffect(()=>{
    setproduct(products.filter((element)=>(element._id===productid)));
    window.scrollTo(0, 0);
  },[productid]);

  if (!product || product.length === 0 ) {
    return <div className="opacity-0"></div>;
  }

  return (
    <main className="mt-10 mb-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-opacity duration-500 ease-in opacity-100">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12 pt-10">
        
        {/* Product Images View */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-start sm:w-[18.7%] w-full flex-shrink-0 hide-scrollbar gap-2">
            {/* Example Image Placeholder */}
            {
              product[0].image.map((element: string, index: number)=>
                <img key={index} src={element} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer bg-gray-200 h-24 object-cover"/>
              )
            }
          </div>
          <div className="w-full sm:w-[80%] bg-gray-200 min-h-[400px]">
            {/* Main Image Placeholder */}
            <img className="w-full h-auto object-cover" src={product[0].image[0]} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product[0].name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{product[0].price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5 text-sm md:text-base leading-relaxed">
            {product[0].description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
                {
                  product[0].sizes.map((element:string)=>(
                    <button className={`border border-gray-300 py-2 px-4 bg-gray-50 hover:bg-gray-100 transition-colors`}>{element}</button>
                  ))
                }
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 transition-colors">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <button 
            className={`px-5 py-3 text-sm border font-medium border-b-0 font-bold`}
          >
            Description
          </button>
          <button 
            className={`px-5 py-3 text-sm border font-medium border-gray-300 text-gray-500`}
          >
            Reviews (122)
          </button>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500 leading-relaxed">
            <p>
              An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
            </p>
            <p>
              E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
            </p>
        </div>
      </div>

      {/* Related Products Section */}
        <div className="mt-24">
          <div className="text-center text-3xl mb-10">
            <h1 className="text-gray-500">RELATED <span className="text-gray-700 font-medium">PRODUCTS</span> <span className="text-gray-400">____</span></h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
              {/* Product Card Placeholder */}
              {
                products.map((element, index)=>
                element.name===product[0].name?
                (
                  <Link to={`/product/${element._id}`} key={index} className='text-current no-underline block'>
                    <div className="flex flex-col cursor-pointer group">
                      <div className='overflow-hidden'>
                        <img src={element.image[0]} alt={element.name} className='animation object-cover'/>
                      </div>
                      <p className="pt-3 pb-1 text-sm">{element.name}</p>
                      <p className="text-sm font-medium">{element.price}</p>
                    </div>
                  </Link>
                ):null
                )
              }
          </div>
        </div>
    </main>
  );
};

export default Productpage;
