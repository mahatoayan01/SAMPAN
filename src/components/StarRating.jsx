import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={size} className={star <= rating ? 'text-primary-500 fill-primary-500' : 'text-dark-600'} />
      ))}
    </div>
  );
}
