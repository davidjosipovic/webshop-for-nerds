import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/profile');

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log('Error fetching user profile:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout');
      if (response.ok) {
        // Clear user data and redirect to login page
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/login';
      } else {
        console.log('Error logging out:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="w-1/3 bg-white rounded shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="mb-2">
            Username: <span className="font-semibold">{user.username}</span>
          </p>
          <p className="mb-2">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
          <p className="mb-2">
            Shipping Address:{' '}
            <span className="font-semibold">{user.shipping_address}</span>
          </p>
          <p className="mb-2">
            Billing Address:{' '}
            <span className="font-semibold">{user.billing_address}</span>
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
