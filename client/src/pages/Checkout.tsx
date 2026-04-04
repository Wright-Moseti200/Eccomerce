import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Contextdata } from '../context/ContextProvider'

const Checkout = () => {
  const [method, setMethod] = useState<'stripe' | 'mpesa'>('stripe');
  const [deliveryInfo, setDeliveryInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  
  const context = useContext(Contextdata);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!context) return;

    // Validate inputs
    const requiredFields = ['first_name', 'last_name', 'email', 'street', 'city', 'country', 'phone'];
    for (const field of requiredFields) {
      if (!deliveryInfo[field as keyof typeof deliveryInfo]) {
        alert(`Please fill in the ${field.replace('_', ' ')} field.`);
        return;
      }
    }

    if (context.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Construct cartdata matching backend expectations
    const detailedCartData = context.cart.map(item => {
      const product = context.products.find(p => p._id === item.id);
      if (!product) return null;
      return {
        id: item.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes[item.sizeindex],
        quantity: item.quantity,
        sizeindex: item.sizeindex
      };
    }).filter(item => item !== null);

    if (method === 'stripe') {
      const url = await context.stripePayment(deliveryInfo, detailedCartData);
      if (url) {
        window.location.href = url; // Redirect to Stripe
      }
    } else if (method === 'mpesa') {
      const url = await context.mpesaPayment(deliveryInfo, detailedCartData);
      if (url) {
         window.location.href = url; // Redirect to Paystack/M-Pesa STK Push authorization
      }
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-20'>
      
      {/* ------------- Left Side: Delivery Information ------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-xl sm:text-2xl my-3'>
          <h1 className='text-2xl text-gray-900'>DELIVERY <span className='font-semibold'>INFORMATION ___</span></h1>
        </div>
        
        <div className='flex gap-3'>
          <input required onChange={handleInputChange} value={deliveryInfo.first_name} name="first_name" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='First name' />
          <input required onChange={handleInputChange} value={deliveryInfo.last_name} name="last_name" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='Last name' />
        </div>
        
        <input required onChange={handleInputChange} value={deliveryInfo.email} name="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="email" placeholder='Email address' />
        <input required onChange={handleInputChange} value={deliveryInfo.street} name="street" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='Street' />
        
        <div className='flex gap-3'>
          <input required onChange={handleInputChange} value={deliveryInfo.city} name="city" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='City' />
          <input onChange={handleInputChange} value={deliveryInfo.state} name="state" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='State' />
        </div>
        
        <div className='flex gap-3'>
          <input onChange={handleInputChange} value={deliveryInfo.zipcode} name="zipcode" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="number" placeholder='Zipcode' />
          <input required onChange={handleInputChange} value={deliveryInfo.country} name="country" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="text" placeholder='Country' />
        </div>
        
        <input required onChange={handleInputChange} value={deliveryInfo.phone} name="phone" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none text-base' type="number" placeholder='Phone (e.g., +2547...)' />
      </div>

      {/* ------------- Right Side: Totals & Payment ------------- */}
      <div className='mt-8 sm:mt-0'>
        
        <div className='mt-8 min-w-80'>
          <div className='text-2xl'>
            <h1 className='text-2xl text-gray-900'>CART <span className='font-semibold'>TOTALS ___</span></h1>
          </div>
          <div className='flex flex-col gap-2 mt-2 text-[15px] sm:text-base'>
            <div className='flex justify-between py-3 border-b'>
              <p>Subtotal</p>
              <p>Ksh {context ? context.gettotalamount() : 0}.00</p>
            </div>
            <div className='flex justify-between py-3 border-b'>
              <p>Shipping Fee</p>
              <p>Ksh {context && context.gettotalamount() > 0 ? context.delivery_fee : 0}.00</p>
            </div>
            <div className='flex justify-between py-3'>
              <b className='text-lg'>Total</b>
              <b className='text-lg'>Ksh {context && context.gettotalamount() > 0 ? context.gettotalamount() + context.delivery_fee : 0}.00</b>
            </div>
          </div>
        </div>

        <div className='mt-12'>
          <div className='text-base sm:text-lg mb-3'>
            <h2 className='text-gray-900'>PAYMENT <span className='font-semibold'>METHOD ___</span></h2>
          </div>
          
          <div className='flex flex-col lg:flex-row gap-3'>
            <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'stripe' ? 'border-black bg-gray-50' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('mpesa')} className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'mpesa' ? 'border-black bg-gray-50' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'mpesa' ? 'bg-green-400' : ''}`}></p>
              <div className='h-5 mx-2 text-sm font-bold text-green-700 uppercase flex items-center tracking-wider'>
                 M-PESA
              </div>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors uppercase font-medium'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
