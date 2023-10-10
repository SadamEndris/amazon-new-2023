import React from "react";
import "./Product.css";
import { useStateValue } from "../contexts/StateProvider.js";
const Product = ({ id, title, price, rating, image }) => {
  const [{ basket }, dispatch] = useStateValue();
  // console.log(`this is the baske`, basket);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        image: image,
        id: id,
        title: title,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong className="price">{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
