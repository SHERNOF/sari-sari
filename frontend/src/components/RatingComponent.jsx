import React from "react";
import Rating from "@mui/material/Rating";

export default function RatingComponent({ rating }) {
  // const { rating } = props;
  console.log(rating);
  return (
    <div>
      <Rating
        // sx={{ marginBottom: 1.5 }}
        defaultValue={rating}
        precision={0.5}
      />
    </div>
  );
}
