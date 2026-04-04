import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { Contextdata } from '../context/ContextProvider'
import "../App.css"
const Homepage = () => {

    const context = useContext(Contextdata);
    const products = context?.products || [];
    const latestcollection = products.filter((element)=>element.bestseller===false).slice(0,10).reverse();
    const bestseller = products.filter((element)=>element.bestseller===true).slice(0,5).reverse();

  return (
    <>
    <main className='mt-8 sm:mt-17 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='flex justify-center'>
        <article className='flex flex-col sm:flex-row border border-gray-400 w-full'>
            <div className='flex flex-row w-full sm:w-1/2 justify-center items-center py-10 sm:py-0'>
               <div className='text-[#414141]'>
                  <div className='flex items-center gap-2'>
                     <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                     <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                  </div>
                  <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed font-serif text-gray-800'>Latest Arrivals</h1>
                  <div className='flex items-center gap-2'>
                     <p className='font-semibold text-sm md:text-base cursor-pointer'>SHOP NOW</p>
                     <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                  </div>
               </div>
            </div>
            <div className='flex flex-row w-full sm:w-1/2'>
              <img src={assets.hero_img} alt="hero-image" className='w-full object-cover'/>
            </div>
        </article>
      </div>

        <header className='mt-15 text-center text-3xl font-serif text-gray-800'>LATEST <span className='font-semibold text-gray-900'>COLLECTIONS</span></header>
        <p className='mt-2 text-center text-gray-600 px-4 md:px-20'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta in ullam recusandae, illum obcaecati rem itaque fugit nemo labore amet laudantium, beatae id magnam velit ipsam alias error cum veniam.</p>
        
        {/* Responsive Grid */}
        <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8'>
          {
            latestcollection.map((element, index)=>
              <Link to={`/product/${element._id}`} key={index} className='text-current no-underline cursor-pointer'>
                <div className='flex flex-col group'>
                  <div className='overflow-hidden rounded-md bg-gray-50 aspect-[3/4]'>
                    <img src={element.image[0]} alt={element.name} className='w-full h-full object-cover group-hover:scale-110 transition ease-in-out'/>
                  </div>
                  <p className='pt-3 pb-1 text-sm text-gray-700 truncate'>{element.name}</p>
                  <p className='font-medium text-sm text-gray-900'>Ksh {element.price}</p>
                </div>
              </Link>
            )
          }
        </section>

        <header className='mt-15 text-center text-3xl font-serif text-gray-800'>BEST <span className='font-semibold text-gray-900'>SELLERS</span></header>
        <p className='mt-2 text-center text-gray-600 px-4 md:px-20'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta in ullam recusandae, illum obcaecati rem itaque fugit nemo labore amet laudantium, beatae id magnam velit ipsam alias error cum veniam.</p>
        
        {/* Responsive Grid */}
        <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8'>
          {
            bestseller.map((element, index)=>
              <Link to={`/product/${element._id}`} key={index} className='text-current no-underline cursor-pointer'>
                <div className='flex flex-col group'>
                  <div className='overflow-hidden rounded-md bg-gray-50 aspect-[3/4]'>
                    <img src={element.image[0]} alt={element.name} className='w-full h-full object-cover group-hover:scale-110 transition ease-in-out'/>
                  </div>
                  <p className='pt-3 pb-1 text-sm text-gray-700 truncate'>{element.name}</p>
                  <p className='font-medium text-sm text-gray-900'>Ksh {element.price}</p>
                </div>
              </Link>
            )
          }
        </section>

        <section className='flex flex-col w-full justify-center items-center mt-15 mb-10'>
          <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center w-full'>
            <div className='flex flex-col justify-center items-center'>
              <img src={assets.exchange_icon} className='w-12 m-auto mb-5' />
              <h1 className='font-semibold text-base text-gray-800'>Easy Exchange Policy</h1>
              <p className='text-gray-500'>We offer hassle free exchange policy</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <img src={assets.quality_icon} className='w-12 m-auto mb-5' />
              <h1 className='font-semibold text-base text-gray-800'>7 Days Return Policy</h1>
              <p className='text-gray-500'>We provide 7 days free return policy</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <img src={assets.support_img} className='w-12 m-auto mb-5' />
              <h1 className='font-semibold text-base text-gray-800'>Best customer support</h1>
              <p className='text-gray-500'>We provide 24/7 customer support</p>
            </div> 
          </div>
        </section>
    </main>

    <section className='flex flex-col justify-center items-center mt-30 mb-20 text-center px-4'>
        <h1 className='text-2xl sm:text-3xl font-bold font-serif text-gray-800'>Subscribe now & get 20% off</h1>
        <p className='mt-3 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        <div className='mt-8 flex w-full max-w-xl justify-center'>
            <input type="email" placeholder='Enter your email' className='px-4 py-3 outline-none border border-gray-300 w-full sm:w-2/3'/>
            <button className='bg-black text-white px-8 py-3 w-1/3 hover:bg-gray-800 transition-colors font-medium'>SUBSCRIBE</button>
        </div>
    </section>
    </>
  )
}

export default Homepage
