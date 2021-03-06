import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCartQuantity } from '../../redux/cartSlice';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  
  const addToCartClick = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      const newQuantity = parseInt(itemInCart.purchaseQuantity) + 1;
      dispatch(updateCartQuantity({_id: item._id, purchaseQuantity: newQuantity}));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: newQuantity
      });
    } else {
      dispatch(addToCart({ ...item, purchaseQuantity: 1 }));
      idbPromise('cart', 'add', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCartClick}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
