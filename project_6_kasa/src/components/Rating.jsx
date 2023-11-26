import starFull from "../assets/static/star_full.svg";
import starEmpty from "../assets/static/star_empty.svg";

export default function Rating({ rating }) {
  const totalStars = 5;
  const ratingStars = parseInt(rating);
  const emptyStars = totalStars - ratingStars;

  // generate star image based on rating
  const renderStars = (num, type) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <img
          key={i}
          src={type === "full" ? starFull : starEmpty}
          alt={`${type} star`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="rating-wrapper">
      {renderStars(ratingStars, "full")}
      {renderStars(emptyStars, "empty")}
    </div>
  );
}
