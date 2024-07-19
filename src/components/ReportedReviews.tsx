import React from 'react';

const reviews = [
  { reviewId: 'R001', businessId: 'B001', description: 'Inappropriate content' },
  { reviewId: 'R002', businessId: 'B002', description: 'Spam' },
  { reviewId: 'R003', businessId: 'B003', description: 'Offensive language' },
];

const ReportedReviews: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reported Reviews</h2>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Review ID</th>
            <th className="py-2 px-4 border-b">Business ID</th>
            <th className="py-2 px-4 border-b">Review Description</th>
            <th className="py-2 px-4 border-b">Keep or Remove</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.reviewId}>
              <td className="py-2 px-4 border-b">{review.reviewId}</td>
              <td className="py-2 px-4 border-b">{review.businessId}</td>
              <td className="py-2 px-4 border-b">{review.description}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-yellow-500 text-primary px-2 py-1 rounded-custom mr-2">Keep</button>
                <button className="bg-bluegray text-primary px-2 py-1 rounded-custom">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedReviews;
