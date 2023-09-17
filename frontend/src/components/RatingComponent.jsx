import React from "react";
import Rating from "@mui/material/Rating";

export default function RatingComponent({ rating }) {
  return (
    <div>
      <Rating defaultValue={rating} precision={0.5} />
    </div>
  );
}
