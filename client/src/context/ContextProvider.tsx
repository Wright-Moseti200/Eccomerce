import React, { createContext, useState } from 'react'
import { products } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

type cartitem = {
  id: string,
  quantity: number,
  sizeindex: number
};

type ContextType = {
  cart: cartitem[],
  addtocart: (id: string, sizes: number) => void,
  removefromcart: (id: string) => void,
  updatecart: (id: string, value: number, sizes: number) => void,
  gettotalamount: () => number,
  getcarttotal: () => number,
  navigate: ReturnType<typeof useNavigate>,
  delivery_fee: number
};

export const Contextdata = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<cartitem[]>([]);
  const navigate = useNavigate();
  const delivery_fee = 10;

  const addtocart = (id: string, sizes: number): void => {
    let cartdata: cartitem;
    if (cart.length === 0) {
      cartdata = { id: id, quantity: 1, sizeindex: sizes };
      setCart([...cart, cartdata]);
    } else {
      let existingitem = cart.find((element) =>
        element.id === id && element.sizeindex === sizes
      );
      if (existingitem) {
        setCart(cart.map((element) =>
          element.id === id && element.sizeindex === sizes
            ? { ...element, quantity: element.quantity + 1 }
            : element
        ));
      } else {
        cartdata = { id: id, quantity: 1, sizeindex: sizes };
        setCart([...cart, cartdata]);
      }
    }
  };

  const removefromcart = (id: string): void => {
    const newcart = cart.filter((element) => element.id !== id);
    setCart(newcart);
  };

  const updatecart = (id: string, value: number, sizes: number): void => {
    if (value < 1) {
      alert("Value cannot be less than 1");
      return;
    }
    setCart(cart.map((element) =>
      element.id === id && element.sizeindex === sizes
        ? { ...element, quantity: value }
        : element
    ));
  };

  const gettotalamount = (): number => {
    let totalamount: number = 0;
    for (let i = 0; i < cart.length; i++) {
      let product = products.find((element) => element._id === cart[i].id);
      if (product) {
        totalamount += product.price * cart[i].quantity;
      }
    }
    return totalamount;
  };

  const getcarttotal = (): number => {
    return cart.length;
  };

  return (
    <Contextdata.Provider value={{ addtocart, cart, removefromcart, updatecart, gettotalamount, getcarttotal, navigate, delivery_fee }}>
      {children}
    </Contextdata.Provider>
  );
};

export default ContextProvider;