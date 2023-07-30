import React from "react";
import Rating from "@mui/material/Rating";

export default function RatingComponent(props) {
  const { rating, numReviews } = props;
  return (
    <div>
      <Rating
        sx={{ marginBottom: 1.5 }}
        defaultValue={rating}
        precision={0.5}
      />
      ;<p style={{ marginTop: "-.5rem" }}>{numReviews} reviews</p>
    </div>
  );
}
