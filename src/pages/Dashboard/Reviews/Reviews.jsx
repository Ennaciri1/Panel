// src/pages/Dashboard/Reviews/Reviews.jsx
import React, { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";

const mockReviews = [
  {
    id: 1,
    guest: "Sarah Johnson",
    property: "Beautiful Villa in Marrakech",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely stunning villa! The service was impeccable and the location perfect. We had an amazing time and would definitely come back.",
    response: null,
    status: "pending"
  },
  {
    id: 2,
    guest: "Michael Chen",
    property: "Cozy Apartment in Casablanca",
    rating: 4,
    date: "2024-01-12",
    comment: "Great apartment in a good location. Clean and comfortable. The host was very responsive. Only minor issue was the WiFi speed.",
    response: "Thank you for your feedback! We've upgraded our internet connection since your stay.",
    status: "responded"
  },
  {
    id: 3,
    guest: "Emma Wilson",
    property: "Luxury Riad in Fes",
    rating: 5,
    date: "2024-01-10",
    comment: "The riad exceeded all expectations. Beautiful architecture, amazing breakfast, and the staff went above and beyond.",
    response: "We're thrilled you enjoyed your stay! Thank you for the wonderful review.",
    status: "responded"
  },
  {
    id: 4,
    guest: "David Martinez",
    property: "Seaside Villa in Agadir",
    rating: 3,
    date: "2024-01-08",
    comment: "Nice villa but had some issues with cleanliness. The view was great though and the location is perfect for the beach.",
    response: null,
    status: "pending"
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Reviews() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [responseText, setResponseText] = useState({});

  const filteredReviews = mockReviews.filter(review => {
    const matchesFilter = filter === "all" || review.status === filter;
    const matchesSearch = 
      review.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleResponseChange = (reviewId, text) => {
    setResponseText(prev => ({
      ...prev,
      [reviewId]: text
    }));
  };

  const handleSubmitResponse = (reviewId) => {
    console.log("Submitting response for review", reviewId, ":", responseText[reviewId]);
    // Ici tu enverrais la réponse à ton API
    setResponseText(prev => {
      const newState = { ...prev };
      delete newState[reviewId];
      return newState;
    });
  };

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
  const pendingCount = mockReviews.filter(r => r.status === "pending").length;
  const respondedCount = mockReviews.filter(r => r.status === "responded").length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
        <p className="text-lg text-gray-600">Manage and respond to customer feedback</p>
      </div>

      {/* Statistiques des reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900">{mockReviews.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
            <StarRating rating={Math.round(averageRating)} />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Pending Response</p>
          <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Responded</p>
          <p className="text-2xl font-bold text-green-600">{respondedCount}</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="search"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search"
          />
          
          <Input
            select
            options={[
              { value: "all", label: "All Reviews" },
              { value: "pending", label: "Pending Response" },
              { value: "responded", label: "Responded" }
            ]}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter by Status"
          />
        </div>
      </div>

      {/* Liste des reviews */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{review.guest}</h3>
                  <p className="text-sm text-gray-600">{review.property}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.status === "pending" 
                    ? "bg-orange-100 text-orange-800" 
                    : "bg-green-100 text-green-800"
                }`}>
                  {review.status === "pending" ? "Pending Response" : "Responded"}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>

              {review.response && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Your Response:</p>
                  <p className="text-gray-700">{review.response}</p>
                </div>
              )}

              {review.status === "pending" && (
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Write a response:
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    rows="3"
                    placeholder="Thank you for your feedback..."
                    value={responseText[review.id] || ""}
                    onChange={(e) => handleResponseChange(review.id, e.target.value)}
                  />
                  <div className="flex justify-end mt-3">
                    <Button
                      size="md"
                      onClick={() => handleSubmitResponse(review.id)}
                      disabled={!responseText[review.id]?.trim()}
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filters."
                : "Reviews from your guests will appear here."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}