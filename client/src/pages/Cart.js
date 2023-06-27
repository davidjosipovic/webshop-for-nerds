import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useContext(CartContext);

  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="border border-gray-200 p-4 mb-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600">Price: {item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <div className="flex mt-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  onClick={() => {
                    if (item.quantity > 1) {
                      handleUpdateQuantity(item.product_id, item.quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleRemoveItem(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total Price: {totalPrice.toFixed(2)}€</h3>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
