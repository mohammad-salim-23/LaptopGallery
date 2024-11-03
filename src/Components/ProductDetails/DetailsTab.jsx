import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Rating from 'react-rating-stars-component';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';

import { toast, Toaster } from 'react-hot-toast';
import useReview from '../../hooks/useReview';

const DetailsTab = ({ productDescription, reviewId }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const { user } = useAuth();
    const date = new Date();
    const image = user?.photoURL;
    const userName = user?.displayName;
    const [reviews] = useReview();
    const productReview = reviews?.filter(r => String(r.productId) === String(reviewId));

    const reviewDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    const axiosPublic = useAxiosPublic();

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const info = {
            rating,
            review,
            reviewerEmail: user?.email,
            reviewerImg: image,
            reviewerName: userName,
            productId: reviewId,
            reviewDate,
            time
        };

        axiosPublic.post("/review", info)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Thanks For Your Review");
                } else {
                    toast.error("Failed to submit review");
                }
            });
    };

    // Sort product reviews by date and time (latest first)
    const sortedProductReview = productReview?.sort((a, b) => {
        const dateA = new Date(`${a.reviewDate} ${a.time}`);
        const dateB = new Date(`${b.reviewDate} ${b.time}`);
        return dateB - dateA; // Sort in descending order
    });

    return (
        <div className='p-24'>
            <div><Toaster position="top-right" /></div>
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Review</Tab>
                </TabList>
                {/* Description panel */}
                <TabPanel>
                    {productDescription ? (
                        <p>{productDescription}</p>
                    ) : (
                        <p>
                            This product is perfect for anyone looking for a reliable and high-performance device. Whether you're shopping for a laptop to handle demanding tasks or a smartphone to stay connected on the go, our selection offers the latest features and cutting-edge technology. Enjoy seamless multitasking, powerful processors, and vibrant displays. With sleek designs and a range of models to choose from, you’ll find the perfect fit for your needs. Each device is built for durability and optimized to keep you efficient and entertained throughout your day.
                        </p>
                    )}
                </TabPanel>
                {/* Review panel */}
                <TabPanel>
                    <h2 className="flex justify-center items-center text-lg font-semibold mb-4 text-gray-800">Product Reviews</h2>
                    {sortedProductReview && sortedProductReview.length > 0 ? (
                        sortedProductReview.map((review, index) => (
                            <div key={index} className="mb-4 flex items-start space-x-4">
                                {/* Reviewer's Image */}
                                <img
                                    src={review.reviewerImg}
                                    alt={review.reviewerName}
                                    className="w-12 h-12 rounded-full"
                                />

                                {/* Reviewer's Information and Content */}
                                <div>
                                    <p className="font-semibold">{review.reviewerName}</p>
                                    <p className="text-sm text-gray-500">{review.reviewDate} at {review.time}</p>

                                    {/* Rating Display */}
                                    <Rating
                                        count={5}
                                        value={review.rating}
                                        edit={false}
                                        size={20}
                                        activeColor="#ffd700"
                                    />

                                    {/* Review Text */}
                                    <p className="mt-2">{review.review}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available for this product.</p>
                    )}

                    {/* Review Submission Form */}
                    <div className='border border-gray-300 my-4'></div>
                    <h2 className="flex justify-center items-center text-lg font-semibold mb-4 text-gray-800">Add a review</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="block font-medium mb-1">Your Rating *</label>
                            <Rating
                                count={5}
                                value={rating}
                                onChange={handleRatingChange}
                                size={30}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Your Review *</label>
                            <textarea
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Your Review"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
                        >
                            Submit
                        </button>
                    </form>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default DetailsTab;
