import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold underline mb-6 text-gray-800">
        Welcome to Our Website!
      </h1>
      <p className="text-lg text-gray-700 max-w-md text-center">
        Thank you for visiting our website. We provide a wide range of products and services to meet your needs. Browse through our offerings and feel free to contact us if you have any questions.
      </p>
      <p className="mt-6 text-lg text-gray-700 max-w-md text-center">
        Start exploring our website to find what you're looking for!
      </p>
      <Link to="/search"> {/* Use the Link component with the "to" attribute to navigate */}
        <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
          Explore Now
        </button>
      </Link>
    </div>
  );
}

export default Home;

