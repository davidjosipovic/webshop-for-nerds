import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Posters = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products?category=Posters');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Posters</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.product_id} to={`/product/${product.product_id}`}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={`http://localhost:3001/images/${product.image_url}`}
                alt={product.name}
                className="w-full mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posters;
