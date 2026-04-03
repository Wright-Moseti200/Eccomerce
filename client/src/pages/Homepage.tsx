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
    <main className='mt-17'>
      <div className='flex justify-center'>
        <article className='flex border border-black h-120 justify-center w-3/4'>
            <div className='flex flex-row w-1/2 justify-center items-center'>
            <p>
              <p className='font-bold font-serif text-lg'>____ OUR BESTSELLERS</p>
              <h1 className='font-semi font-serif text-6xl'>Latest Arrivals</h1>
              <p className='font-bold text-lg font-serif'>SHOP NOW ____</p>
            </p>
            </div>
            <div className='flex flex-row w-1/2'>
              <img src={assets.hero_img} alt="hero-image"/>
            </div>
        </article>
        </div>
        <header className='mt-15 text-center text-3xl '>LATEST <span className='font-semibold'>COLLECTIONS ____</span></header>
        <p className='mt-2 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta in ullam recusandae, illum obcaecati rem itaque fugit nemo labore amet laudantium, beatae id magnam velit ipsam alias error cum veniam.</p>
        <section className='grid grid-cols-5 w-full justify-items-center-safe justify-center gap-y-10 mt-5'>
          {
            latestcollection.map((element, index)=>
              <Link to={`/product/${element._id}`} key={index} className='text-current no-underline block'>
                <div className='flex flex-col w-67'>
                  <div className='overflow-hidden'>
                    <img src={element.image[0]} alt={element.name} className='animation'/>
                  </div>
                  <p className='mt-2'>{element.name}</p>
                  <p className='font-semibold mt-1'>Ksh {element.price}</p>
                </div>
              </Link>
            )
          }
        </section>
        <header className='mt-15 text-center text-3xl '>BEST <span className='font-semibold'>SELLERS ____</span></header>
        <p className='mt-2 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta in ullam recusandae, illum obcaecati rem itaque fugit nemo labore amet laudantium, beatae id magnam velit ipsam alias error cum veniam.</p>
        <section className='grid grid-cols-5 w-full justify-items-center-safe justify-center gap-y-10 mt-5'>
          {
            bestseller.map((element, index)=>
              <Link to={`/product/${element._id}`} key={index} className='text-current no-underline block'>
                <div className='flex flex-col w-67'>
                  <div className='overflow-hidden'>
                    <img src={element.image[0]} alt={element.name} className='animation'/>
                  </div>
                  <p className='mt-2'>{element.name}</p>
                  <p className='font-semibold mt-1'>Ksh {element.price}</p>
                </div>
              </Link>
            )
          }
        </section>
        <section className='flex flex-col w-full justify-center items-center mt-15'>
          <div className='grid grid-cols-3 gap-40'>
          <div className='flex flex-col justify-center items-center'>
            <img src={assets.exchange_icon}/>
            <h1 className='font-bold mt-2'>Easy Exchange Policy</h1>
            <p className='mt-1'>We offer hassle free exchange policy</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img src={assets.quality_icon}/>
            <h1 className='font-bold mt-2'>7 Days Return Policy</h1>
            <p className='mt-1'>We provide 7 days free return policy</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <img src={assets.support_img}/>
            <h1 className='font-bold mt-2'>Best customer support</h1>
            <p className='mt-1'>We provide 24/7 customer support</p>
          </div> 
          </div>
        </section>
    </main>
    </>
  )
}

export default Homepage
