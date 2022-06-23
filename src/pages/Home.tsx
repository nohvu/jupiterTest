import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { ProductItem } from '../components/ProductBlock';

import { filterSelector, setCategoryType } from '../redux/slices/filterSlice';
import { fetchProducts, productSelector } from '../redux/slices/productSlice';

const Home = () => {
  const [loadMore, setLoadMore] = React.useState(false);
  const { categoryType } = useSelector(filterSelector);
  const { items: products } = useSelector(productSelector);
  const dispatch = useDispatch();

  const loader = loadMore ? products.length : 9;
  const loadProducts = products.slice(0, loader);

  const getProducts = async () => {
    //@ts-ignore
    dispatch(fetchProducts({ categoryType }));
  };

  React.useEffect(() => {
    getProducts();
  }, [categoryType]);

  return (
    <>
      <div className="content__top">
        <select
          value={categoryType}
          onChange={(e) => dispatch(setCategoryType(e.target.value))}
          className="category__selector"
          name="category">
          <option value="Show all">Show all</option>
          <option value="Design">Design</option>
          <option value="Branding">Branding</option>
          <option value="Illustration">Illustration</option>
          <option value="Motion">Motion</option>
        </select>
        <Categories />
      </div>

      {products.length ? (
        <>
          <div className="content__items">
            {loadProducts.map((product, index) => (
              <ProductItem index={index} key={index} {...product} />
            ))}
          </div>
          {!loadMore ? (
            <button onClick={() => setLoadMore(true)}>Load more</button>
          ) : (
            <button onClick={() => (setLoadMore(false), window.scrollTo(0, 0))}>Minimize</button>
          )}
        </>
      ) : (
        <h2>Empty : (</h2>
      )}
    </>
  );
};

export default Home;
