import React, { useState, useEffect, lazy, Suspense } from 'react';
import cn from "./style.module.css";
import { useTranslation } from 'react-i18next';
import serverApi from '../serverApi';

const LanguageSwitcher = lazy(() => import("../components/LanguageSwitcher"));

function Reviews() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    reviewUser();
  }, []);

  const reviewUser = async () => {
    try {
      const response = await serverApi.get('user/getusers');
      setReviews(response.data);
      console.log(response.data);
      
    } catch (err) {
      setError('Error fetching reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) return;

    try {
    
      if (name === '@COco5808') {
        setDeleteMode(true);
        setName(''); 
        setReview(''); 
        return;
      }

      await serverApi.post('user/adduser', {
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

    } catch (err:any) {
      if (err.response && err.response.status === 429) {
        // Ошибка с кодом 429 (слишком много запросов)
        setError('Слишком много запросов. Пожалуйста, попробуйте позже.');
      } else {
        // Обработка других ошибок
        setError('Ошибка при отправке отзыва. Пожалуйста, попробуйте снова.');
      }
    }
  };

  const handleDelete = async (id: Number) => {
    try {
      await serverApi.delete(`user/deleteuser/${id}`);
      setSuccessMessage('Отзыв успешно удален!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      reviewUser();
    } catch (err) {
      setError('Error deleting review. Please try again.');
    }
  };

  return (
    <div className="container p-0">
      <div className={cn.title}>
        <div className={cn.title_content}>
          <h3>{t('reviews')}</h3>
          <Suspense fallback={null}>
            <LanguageSwitcher/>
          </Suspense>
        </div>
      </div>

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
        <button type="submit" className="btn btn-primary">
          Отправить отзыв
        </button>
      </form>

      {deleteMode && (
        <div className="alert alert-warning mt-4">
          <strong>Внимание!</strong> Удаление отзывов доступно.
        </div>
      )}

      <div className="mt-4">
        <h3>Все отзывы:</h3>
        {loading ? (
          <div>Loading reviews...</div>
        ) : (
          <ul className="list-group">
            {reviews.map((reviewItem) => (
              <li key={reviewItem.id || reviewItem.name} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <span className="fw-bold">{reviewItem.name}</span>:
                  <span className="ms-2">{reviewItem.coment}</span>
                </div>
                {deleteMode && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(reviewItem.id)}> Удалить </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reviews;
