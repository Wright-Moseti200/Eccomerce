/* eslint-disable no-global-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext } from 'react'

export const Contextdata = createContext();

const ContextProvider = ({children}) => {  

  type cartitem = {
    id: string,
    quantity: number,
    sizeindex: number
  };

  const cart: cartitem[] = [];

  const addtocart = (id:string,sizes:number) :void =>{
    let cartdata : cartitem;
    if(cart.length===0){
      cartdata={
        id:id,
        quantity:1,
        sizeindex:sizes
      }
      cart.push(cartdata);
    }
    else{
      let existingitem = cart.find((element)=>
        element.id===id&&element.sizeindex===sizes
      );
      if(existingitem){
        existingitem.quantity+=1
      }
      else{
        cartdata = {id:id,quantity:1,sizeindex:sizes}
        cart.push(cartdata)
      }
    }
  }

  const removefromcart = (id:string) :void =>{
    const newcart = cart.filter((element)=>element.id!=id);
    cart=newcart;
  }

  const updatecart = (id:string) :void =>{

  }

  const gettotalamount = () :void =>{

  }

  const getcarttotal = () :number =>{
    const length = cart.length;
    return length
  }

  return (
    <Contextdata.Provider value={{addtocart,cart,removefromcart,updatecart,gettotalamount,getcarttotal}}>
        {children}
    </Contextdata.Provider>
  )
}

export default ContextProvider
