import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    setSearchQuery(query || ''); // Set an empty string as default search query if query is null or undefined

    // Make API request to search endpoint with the query (if provided)
    if (query) {
      fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Make API request to fetch all products when there's no search query
      fetch('http://localhost:3001/api/search')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      {searchQuery && <p className="text-gray-600 mb-4">Showing results for "{searchQuery}"</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {searchResults.map((product) => (
          <Link key={product.product_id} to={`/product/${product.product_id}`}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={`http://localhost:3001/images/${product.image_url}`}
                alt={product.name}
                className="w-full mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-4">{product.price}€</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
