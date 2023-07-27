import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext);
    const [shippingAddress, setShippingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    // Check if the user is logged in based on the value in localStorage
    useEffect(() => {
      const isLoggedInValue = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(isLoggedInValue === 'true');
    }, []);
  
    // If the user is logged in, fetch their shipping and billing addresses from the server
    useEffect(() => {
      if (isLoggedIn) {
        // Make an API request to fetch user details (shipping and billing addresses)
        // Update the state with the fetched addresses
        setShippingAddress('User Shipping Address'); // Replace with API call to get the user's shipping address
        setBillingAddress('User Billing Address'); // Replace with API call to get the user's billing address
      }
    }, [isLoggedIn]);
  
    // Handle the checkout process
   
        const handleCheckout = async () => {
          try {
            // Prepare the data for checkout
            let checkoutData = {
              userId: null,
              cartItems: cartItems,
              totalPrice: totalPrice,
              shippingAddress: '',
              billingAddress: '',
            };
      
            if (isLoggedIn) {
              // If the user is logged in, set the userId and fetch shipping and billing addresses
              checkoutData.userId = localStorage.getItem('userId');
              checkoutData.shippingAddress = shippingAddress;
              checkoutData.billingAddress = billingAddress;
            } else {
              // If the user is not logged in, get the shipping and billing addresses from the input fields
              const shippingAddressInput = document.getElementById('shippingAddress');
              const billingAddressInput = document.getElementById('billingAddress');
              if (shippingAddressInput && billingAddressInput) {
                checkoutData.shippingAddress = shippingAddressInput.value;
                checkoutData.billingAddress = billingAddressInput.value;
              }
            }
      
            // Make the API request to checkout
            const response = await fetch('http://localhost:3001/api/orders/checkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(checkoutData),
            });
  
        if (response.ok) {
          // Clear the cart after a successful checkout
          clearCart();
  
          // Redirect to a success page or show a success message
          navigate('/checkout-success');
        } else {
          console.error('Failed to checkout');
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {/* If the user is logged in, display their shipping and billing addresses */}
      {isLoggedIn && (
        <div>
          <h3 className="text-xl font-bold mb-2">Shipping Address:</h3>
          <p>{shippingAddress}</p>
          <h3 className="text-xl font-bold mt-4 mb-2">Billing Address:</h3>
          <p>{billingAddress}</p>
        </div>
      )}
      {/* If the user is not logged in, display input fields for shipping and billing addresses */}
      {!isLoggedIn && (
        <div>
          <label htmlFor="shippingAddress" className="block font-bold mb-2">
            Shipping Address:
          </label>
          <input
            type="text"
            id="shippingAddress"
            className="border border-gray-400 rounded w-full py-2 px-3 mb-4"
            placeholder="Enter your shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />

          <label htmlFor="billingAddress" className="block font-bold mb-2">
            Billing Address:
          </label>
          <input
            type="text"
            id="billingAddress"
            className="border border-gray-400 rounded w-full py-2 px-3 mb-4"
            placeholder="Enter your billing address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </div>
      )}
      {/* Display the cart items and total price */}
      {/* ... (your existing cart items and total price display code) */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
