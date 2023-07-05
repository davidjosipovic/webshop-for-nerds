import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Update the login status
        setIsLoggedIn(true);
        // Handle successful login
        const data = await response.json()
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', data.userId); // Save the user ID in localStorage
        console.log('User logged in');
      } else {
        // Handle login error
        const errorData = await response.json();
        console.log('Login error:', errorData);
      }
    } catch (error) {
      // Handle network or other errors
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/check');
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (isLoggedIn) {
    return <div>You are already logged in.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
