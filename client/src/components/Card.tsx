import React from 'react'

const Card = (props:any) => {
  return (
    <div className='flex flex-col w-67'>
                <div className='overflow-hidden'>
                  <img src={props.image} alt={props.name} className='animation'/>
                </div>
                <p>{props.name}</p>
                <p className='font-semibold'>Ksh {props.price}</p>
              </div>
  )
}

export default Card
