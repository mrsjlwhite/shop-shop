import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../redux/productSlice';

function ProductList() {
  const currentCategory = useSelector((state) => state.categories.currentCategory);
  const products = useSelector((state) => state.products.products);
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (products.length) {
      return;
    }
    
    if (productData && productData.products) {
      dispatch(updateProducts([productData.products]));
      productData.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else {
      idbPromise('products', 'get').then((products) => {
        if (products.length) {
          dispatch(updateProducts(products));
        }
      });
    }
  }, [productData, products, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
