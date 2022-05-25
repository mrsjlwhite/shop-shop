import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategories, updateCurrentCategory } from '../../redux/categorySlice';

function CategoryMenu() {
  const categories = useSelector((state) => state.categories.categories);
  const currentCategory = useSelector((state) => state.categories.currentCategory);
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (categories.length) {
      return;
    }
    
    if (categoryData && categoryData.categories) {
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else {
      idbPromise('categories', 'get').then(categories => {
        if (categories.length) {
          dispatch(updateCategories(categories));
        }
      });
    }
  }, [categoryData, categories, dispatch]);

  const handleClick = id => {
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          style={{ backgroundColor: currentCategory === item._id ? '#ff48cd' : '#F3A847' }}
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
