import React, { createContext } from 'react'

export const Contextdata = createContext();

const ContextProvider = ({children}) => {  

  const cart =():void =>{

  }

  const addtocart = () :void =>{

  }

  const removefromcart = () :void =>{

  }

  const updatecart = () :void =>{

  }

  const gettotalamount = () :void =>{

  }

  return (
    <Contextdata.Provider value={addtocart,cart,removefromcart,updatecart,gettotalamount}>
        {children}
    </Contextdata.Provider>
  )
}

export default ContextProvider
