import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Autoplay } from 'swiper';
import './Reviews.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Autoplay]);

export default function Reviews() {
  const [reviews, setReviews] = useState([]); // State to hold reviews data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [newReview, setNewReview] = useState({
    name: '',
    review: '',
    rating: 0,
    imageUrl: '', // New field for image URL
  });

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://stirring-biscotti-e3781d.netlify.app/api/reviews');
        if (!response.ok) {
          throw new Error(`HTTP error! status: Rs{response.status}`);
        }
        const data = await response.json();
        setReviews(data); // Set the reviews data from API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (e) => {
    setNewReview({ ...newReview, rating: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review && newReview.rating > 0) {
      try {
        const response = await fetch('https://stirring-biscotti-e3781d.netlify.app/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: Rs{response.status}`);
        }

        const newReviewFromServer = await response.json();
        setReviews([...reviews, newReviewFromServer]); // Update reviews list
        setNewReview({ name: '', review: '', rating: 0, imageUrl: '' });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="reviews" id="reviews">
      <h1 className="heading">
        customer&apos;s <span>review</span>
      </h1>
      <div className="reviews-slider">
        <Swiper
          loop
          autoplay={{ delay: 7500, disableOnInteraction: false }}
          slidesPerView={3}
          centeredSlides
          spaceBetween={20}
          pagination={{ clickable: true }}
          style={{ padding: '1rem' }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review._id || index}>
              <div className="box">
                {review.imageUrl && (
                  <img
                    src={review.imageUrl}
                    alt={`Rs{review.name}'s profile`}
                    className="review-image"
                  />
                )}
                <p>{review.review}</p>
                <h3>{review.name}</h3>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={
                        i < Math.floor(review.rating) ? faStar : faStarHalfAlt
                      }
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <h2 style={{textAlign: 'center'}}>Add Your Review</h2>
        <input
          type="text"
          name="name"
          value={newReview.name}
          onChange={handleInputChange}
          placeholder="Your name"
          required
        />
        <textarea
          name="review"
          value={newReview.review}
          onChange={handleInputChange}
          placeholder="Your review"
          required
        />
        <div className="stars-rating">
          <label htmlFor="rating" className='ratings'>Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={newReview.rating}
            onChange={handleRatingChange}
            min="0"
            max="5"
            step="0.5"
            required
          />
        </div>
        <input
          type="text"
          name="imageUrl"
          value={newReview.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <button type="submit" className="btn" >
          Submit Review
        </button>
      </form>
    </section>
  );
}
