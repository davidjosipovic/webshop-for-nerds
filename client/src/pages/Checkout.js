import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  // Function to handle the payment confirmation (You can implement your payment logic here)
  const handlePaymentConfirmation = () => {
    // Calculate the totalPrice based on cartItems
    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  
    // Make sure totalPrice is a number
    const formattedTotalPrice = totalPrice.toFixed(2);
  
    // Prepare the request body with necessary data
    const requestBody = {
      cartItems: cartItems,
      totalPrice: formattedTotalPrice,
      shippingAddress: 'Your Shipping Address',
      billingAddress: 'Your Billing Address',
      userId: 'Your User ID',
      
    };
    // Make a POST request to your backend's /checkout route
    fetch('/api/orders/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., show a success message, redirect to order success page, etc.
        console.log('Order created:', data);
        // Example: Show a success message to the user
        alert('Payment successful! Your order has been placed.');
      })
      .catch((error) => {
        // Handle any errors that occur during the payment process
        console.error('Error while processing payment:', error);
        // Example: Show an error message to the user
        alert('Payment failed. Please try again later.');
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Fill it</p>
      ) : (
        <>
          {/* Show cart items and order details for payment */}
          {cartItems.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 mb-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600">Price: {item.price}€</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total Price: {totalPrice.toFixed(2)}€</h3>
          </div>

          {/* Button to confirm payment */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handlePaymentConfirmation}
          >
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
