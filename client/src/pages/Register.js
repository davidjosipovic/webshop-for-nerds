import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here (e.g., send a request to the server with the form data)
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shippingAddress" className="block font-semibold">
              Shipping Address:
            </label>
            <input
              type="text"
              id="shippingAddress"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="billingAddress" className="block font-semibold">
              Billing Address:
            </label>
            <input
              type="text"
              id="billingAddress"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
