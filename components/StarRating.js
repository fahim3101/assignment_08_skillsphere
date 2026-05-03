import { Star } from "lucide-react";

export default function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-200"
              : "text-indigo-700"
          }
        />
      ))}
      <span className="ml-1.5 text-sm text-yellow-400 font-medium">{rating}</span>
    </div>
  );
}
