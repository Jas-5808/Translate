import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
  const [name, setName] = useState(''); 
  const [review, setReview] = useState(''); 
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    reviewUser();
  }, []);

  const reviewUser = async () => {
    const response = await axios.get('http://localhost:5000/api/user/getusers');
    setReviews(response.data);
  };

  const handleSubmit = async () => {
    
    console.log(name, review);
    await axios.post('http://localhost:5000/api/user/adduser', {
      name: name,
      coment: review,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Отзывы</h2>

      {/* Форма для добавления отзыва */}
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

      {/* Список всех отзывов */}
      <div className="mt-4">
        <h3>Все отзывы:</h3>
        <ul className="list-group">
          {reviews.map((reviewItem, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
              {/* Имя пользователя стилизовано как жирный, отзыв — обычным текстом */}
              <div>
                <span className="fw-bold">{reviewItem.name}</span>: 
                <span className="ms-2">{reviewItem.coment}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reviews;
