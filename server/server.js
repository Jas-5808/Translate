const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());  
app.use(express.json()); 

let reviews = [
  { name: 'Иван', review: 'Отличный сайт!' },
  { name: 'Мария', review: 'Очень полезно!' }
];

app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const newReview = req.body;
  reviews.push(newReview);
  res.status(201).json(newReview);  
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
