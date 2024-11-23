import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
  const [name, setName] = useState('');  // Для хранения имени пользователя
  const [review, setReview] = useState('');  // Для хранения текста отзыва
  const [reviews, setReviews] = useState([]);  // Для хранения списка отзывов

  // Загрузка отзывов с сервера при загрузке компонента
  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')  // URL вашего сервера
      .then((response) => setReviews(response.data))
      .catch((error) => console.error('Ошибка при загрузке отзывов:', error));
  }, []);

  // Обработчик для отправки нового отзыва на сервер
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !review) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newReview = { name, review };

    // Отправка нового отзыва на сервер
    axios.post('http://localhost:5000/api/reviews', newReview)
      .then((response) => {
        setReviews([...reviews, response.data]);  // Обновляем список отзывов
        setName('');  // Очистка поля имени
        setReview('');  // Очистка поля отзыва
      })
      .catch((error) => console.error('Ошибка при отправке отзыва:', error));
  };

  return (
    <div>
      <h2>Отзывы</h2>

      {/* Форма для добавления отзыва */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
            required
          />
        </div>
        <div>
          <label htmlFor="review">Отзыв:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Введите ваш отзыв"
            required
          ></textarea>
        </div>
        <button type="submit">Отправить отзыв</button>
      </form>

      {/* Список всех отзывов */}
      <div>
        <h3>Все отзывы:</h3>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.name}</strong>: {review.review}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reviews;
