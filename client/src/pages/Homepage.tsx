/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { assets, products} from '../assets/assets'
import Footer from '../components/Footer'
import "../App.css"
const Homepage = () => {

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
            latestcollection.map((element)=>
              <div className='flex flex-col w-67'>
                <div className='overflow-hidden'>
                  <img src={element.image[0]} alt={element.name} className='animation'/>
                </div>
                <p>{element.name}</p>
                <p className='font-semibold'>Ksh {element.price}</p>
              </div>
            )
          }
        </section>
        <header className='mt-15 text-center text-3xl '>BEST <span className='font-semibold'>SELLERS ____</span></header>
        <p className='mt-2 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta in ullam recusandae, illum obcaecati rem itaque fugit nemo labore amet laudantium, beatae id magnam velit ipsam alias error cum veniam.</p>
        <section className='grid grid-cols-5 w-full justify-items-center-safe justify-center gap-y-10 mt-5'>
          {
            bestseller.map((element)=>
              <div className='flex flex-col w-67'>
                <div className='overflow-hidden'>
                  <img src={element.image[0]} alt={element.name} className='animation'/>
                </div>
                <p>{element.name}</p>
                <p className='font-semibold'>Ksh {element.price}</p>
              </div>
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
          <div className='flex flex-col justify-center items-center mt-30'>
            <h1 className='font-bold text-3xl'>Subscribe now & get 20% off</h1>
            <p className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <div className='mt-5'>
            <input type="email" placeholder='Enter your email' className='p-3.5 outline-none border w-150'/><button className='bg-black text-white w-35 h-14'>SUBSCRIBE</button>
            </div>
          </div>
        </section>
    </main>
    </>
  )
}

export default Homepage
