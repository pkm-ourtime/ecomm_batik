import React, { useEffect, useState } from 'react';
import { addReview, getReview } from '../../../services/ReviewService'

const ReviewUser = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const reviewsData = await getReview(productId);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Failed to fetch reviews", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(productId, rating, comment);
      fetchReviews();
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Failed to add review", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary border-t-2 border-white">Add Review</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-white">
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mt-4 text-white">
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </label>
        <button type="submit" className="mt-4 bg-primary text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      <h2 className="text-2xl text-white font-semibold mt-8 border-t-2 border-white">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="mt-4 p-4 border border-gray-300 rounded-md">
            <p className="font-semibold text-primary">Rating: {review.rating}</p>
            <p className='text-white'>{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="mt-4">No reviews yet.</p>
      )}
    </div>
  )
}

export default ReviewUser