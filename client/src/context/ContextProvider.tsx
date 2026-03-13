import React, { createContext } from 'react'

export const Contextdata = createContext();

const ContextProvider = ({children}) => {  

  let cart =():void =>{

  }

  let addtocart = () :void =>{

  }

  let removefromcart = () :void =>{

  }

  let updatecart = () :void =>{

  }

  let gettotalamount = () :void =>{

  }

  return (
    <Contextdata.Provider value={cart,addtocart,removefromcart,updatecart,gettotalamount}>
        {children}
    </Contextdata.Provider>
  )
}

export default ContextProvider
