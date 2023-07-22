import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ReviewForm from '../components/ReviewForm';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Access the navigate function for navigation

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart'); // Navigate to the cart page after adding an item
  };

  const handleReviewSubmit = async (newReview) => {
    try {
      // Send the new review to the backend for storage
      const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Refresh the reviews after adding a new one
      fetchProductReviews();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex">
        <img src={`http://localhost:3001/images/${product.image_url}`} alt={product.name} className="w-1/3" />
        <div className="ml-4">
          <p>{product.description}</p>
          <p className="text-lg font-bold mt-4">{product.price}€</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Move the review form here, below everything else */}
      <h2 className="text-2xl font-bold my-4">Leave a Review</h2>
      <ReviewForm productId={id} onReviewSubmit={handleReviewSubmit} />
    </div>
  );
};

export default ProductDetails;
