import React from "react";
import Rating from "@mui/material/Rating";

export default function RatingComponent({ rating }) {
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
