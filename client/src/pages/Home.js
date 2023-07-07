import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold underline mb-4 text-gray-800">
        Welcome to Our Website!
      </h1>
      <p className="text-lg text-gray-700">
        Thank you for visiting our website. We provide a wide range of products and services to meet your needs. Browse through our offerings and feel free to contact us if you have any questions.
      </p>
      <p className="mt-4 text-gray-700">
        Start exploring our website to find what you're looking for!
      </p>
    </div>
  );
}

export default Home;
