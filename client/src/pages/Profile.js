import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
        const response = await fetch(`http://localhost:3001/api/users/${userId}`);

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

  const handleLogout = () => {
    // Clear user data and redirect to login page
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    window.location.href = '/login';
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
          <Link to="/editprofile">
            <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold mb-4">
              Edit
            </button>
          </Link>
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
