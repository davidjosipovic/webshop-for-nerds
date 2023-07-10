import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:3001/api/users/${userId}`);

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUsername(data.username);
          setEmail(data.email);
          setShippingAddress(data.shipping_address);
          setBillingAddress(data.billing_address);
        } else {
          console.log('Error fetching user profile:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          shipping_address: shippingAddress,
          billing_address: billingAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log('Profile updated successfully');
        alert('Profile updated successfully');
      } else {
        console.log('Error updating profile:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="w-1/3 bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleUpdateProfile}>
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
              Update Profile
            </button>
          </form>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default EditProfile;
