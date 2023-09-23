import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div>
      <span>
        {rating >= 1 ? (
          <StarIcon />
        ) : rating >= 0.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <StarIcon />
        ) : rating >= 1.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <StarIcon />
        ) : rating >= 2.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <StarIcon />
        ) : rating >= 3.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <StarIcon />
        ) : rating >= 4.5 ? (
          <StarHalfIcon />
        ) : (
          <StarBorderIcon />
        )}
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{" " + numReviews + " reviews"}</span>
      )}
    </div>
  );
}
export default Rating;
