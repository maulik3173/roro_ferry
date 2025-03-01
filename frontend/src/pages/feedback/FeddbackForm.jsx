import React, { useState } from 'react';

const FeedbackForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !rating || !review) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({ name, rating, review, date: new Date().toLocaleDateString() });
    setName('');
    setRating(0);
    setReview('');
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="font-manrope font-bold text-2xl text-black mb-6">Add Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value={0}>Select Rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;