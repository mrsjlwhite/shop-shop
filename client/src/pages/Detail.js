import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import Cart from '../components/Cart';
import { idbPromise } from "../utils/helpers";
import { removeFromCart, updateCartQuantity, addToCart } from '../redux/cartSlice';
import { updateProducts } from '../redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';

function Detail() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);
  
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    // retrieved from server
    else if (productData && productData.products) {
      dispatch(updateProducts(productData.products));
      productData.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
      });
    }
  }, [products, productData, loading, dispatch, id]);

  const addToCartClick = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    
    if (itemInCart) {
      const updatedQuantity = parseInt(itemInCart.purchaseQuantity) + 1;
      dispatch(updateCartQuantity({_id: itemInCart._id, purchaseQuantity: updatedQuantity}));
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: updatedQuantity
      });
    } else {
      dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }));
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'add', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCartClick = () => {
    dispatch(removeFromCart(currentProduct._id));
    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCartClick}>Add to cart</button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCartClick}>
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
