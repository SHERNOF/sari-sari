import React from "react";
import data from "../data";

export default function Home() {
  return (
    <div>
      <h1>Product Selection</h1>
      <div className="products">
        {data.products.map((product) => (
          <div key={product.rt} className="product">
            <a href={`/product/${product.rt}`}>
              <img src={product.image} alt={product.name} />
            </a>
            <div className="product-info">
              <a href={`/product/${product.rt}`}>
                <p>{product.name}</p>
              </a>
              <p>
                <strong>{product.price}</strong>
              </p>
              <button>ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
