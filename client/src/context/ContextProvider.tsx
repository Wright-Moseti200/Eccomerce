import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

export type ProductType = {
  _id: string,
  name: string,
  description: string,
  price: number,
  image: string[],
  category: string,
  subCategory: string,
  sizes: string[],
  date: number,
  bestseller: boolean
};

export type cartitem = {
  id: string,
  quantity: number,
  sizeindex: number
};

export type ContextType = {
  products: ProductType[],
  cart: cartitem[],
  addtocart: (id: string, sizes: number) => Promise<void>,
  removefromcart: (id: string, sizes: number) => Promise<void>,
  updatecart: (id: string, value: number, sizes: number) => Promise<void>,
  gettotalamount: () => number,
  getcarttotal: () => number,
  navigate: ReturnType<typeof useNavigate>,
  delivery_fee: number,
  backendUrl: string,
  stripePayment: (deliveryinfo: any, cartdata: any[]) => Promise<string | undefined>,
  mpesaPayment: (deliveryinfo: any, cartdata: any[]) => Promise<string | undefined>,
  getOrders: () => Promise<any[]>
};

export const Contextdata = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<cartitem[]>([]);
  const navigate = useNavigate();
  const delivery_fee = 10;
  const backendUrl = "http://localhost:3000";
  const { getToken, isSignedIn } = useAuth();

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/users/products');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCart = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const response = await axios.get(backendUrl + '/api/users/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      getUserCart();
    } else {
      setCart([]);
    }
  }, [isSignedIn]);

  const addtocart = async (id: string, sizes: number) => {
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

    if (isSignedIn) {
      try {
        const token = await getToken();
        await axios.post(backendUrl + '/api/users/addtocart', { itemId: id, sizeindex: sizes }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removefromcart = async (id: string, sizes: number) => {
    // Note: Updated to expect sizes as well to match backend logic strictly.
    const newcart = cart.filter((element) => !(element.id === id && element.sizeindex === sizes));
    setCart(newcart);

    if (isSignedIn) {
      try {
        const token = await getToken();
        await axios.post(backendUrl + '/api/users/removefromcart', { itemId: id, sizeindex: sizes }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatecart = async (id: string, value: number, sizes: number) => {
    if (value < 1) {
      alert("Value cannot be less than 1");
      return;
    }
    setCart(cart.map((element) =>
      element.id === id && element.sizeindex === sizes
        ? { ...element, quantity: value }
        : element
    ));

    if (isSignedIn) {
      try {
        const token = await getToken();
        await axios.post(backendUrl + '/api/users/updatecart', { itemId: id, quantity: value, sizeindex: sizes }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.log(error);
      }
    }
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

  const stripePayment = async (deliveryinfo: any, cartdata: any[]): Promise<string | undefined> => {
    if (isSignedIn) {
      try {
        const token = await getToken();
        const response = await axios.post(backendUrl + '/api/users/stripepayment', { deliveryinfo, cartdata }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
            return response.data.url;
        }
      } catch (error) {
        console.log("Stripe Payment Error:", error);
      }
    } else {
        alert("Please sign in to place an order.");
    }
    return undefined;
  };

  const mpesaPayment = async (deliveryinfo: any, cartdata: any[]): Promise<string | undefined> => {
    if (isSignedIn) {
      try {
        const token = await getToken();
        const response = await axios.post(backendUrl + '/api/users/mpesapayment', { deliveryinfo, cartdata }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
            return response.data.url;
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        }
        console.log("M-Pesa Payment Error:", error);
      }
    } else {
        alert("Please sign in to place an order.");
    }
    return undefined;
  };

  const getOrders = async (): Promise<any[]> => {
    if (isSignedIn) {
      try {
        const token = await getToken();
        const response = await axios.get(backendUrl + '/api/users/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          return response.data.orders;
        }
      } catch (error) {
        console.log("Get Orders Error:", error);
      }
    }
    return [];
  };

  return (
    <Contextdata.Provider value={{ products, addtocart, cart, removefromcart, updatecart, gettotalamount, getcarttotal, navigate, delivery_fee, backendUrl, stripePayment, mpesaPayment, getOrders }}>
      {children}
    </Contextdata.Provider>
  );
};

export default ContextProvider;