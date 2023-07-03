import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user] = useState(null);

  useEffect(() => {
    // Add logic to fetch user profile data from the server and update the "user" state
    // For example:
    // fetch('/api/user/profile')
    //   .then((response) => response.json())
    //   .then((data) => setUser(data))
    //   .catch((error) => console.log(error));
  }, []);

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
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
