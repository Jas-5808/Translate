import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    reviewUser();
  }, []);

  const reviewUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/getusers');
      setReviews(response.data);
    } catch (err) {
      setError('Error fetching reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !review) return; 

    try {
      
      await axios.post('http://localhost:5000/api/user/adduser', {
        name: name,
        coment: review,
      });
      
      
      setName('');
      setReview('');
      reviewUser(); 

      setSuccessMessage('Ваш отзыв успешно отправлен!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (err) {
      setError('Error submitting review. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Отзывы</h2>

      {error && <div className="alert alert-danger">{error}</div>}

 
      {successMessage && (
        <div 
          className="alert alert-success position-fixed top-0 start-50 translate-middle-x w-50 zindex-9999" 
          role="alert"
          style={{
            transition: 'top 0.3s ease-in-out',
            zIndex: 9999,
          }}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="form-label">Отзыв:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Введите ваш отзыв"
            className="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Отправить отзыв</button>
      </form>

      <div className="mt-4">
        <h3>Все отзывы:</h3>
        {loading ? (
          <div>Loading reviews...</div>
        ) : (
          <ul className="list-group">
            {reviews.map((reviewItem) => (
              <li key={reviewItem._id || reviewItem.name} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <span className="fw-bold">{reviewItem.name}</span>: 
                  <span className="ms-2">{reviewItem.coment}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reviews;
