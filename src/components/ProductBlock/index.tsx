import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryType } from '../../redux/slices/filterSlice';
import { deleteProduct, productSelector, setTarget } from '../../redux/slices/productSlice';

export interface ProductItemProps {
  id: number;
  title: string;
  category: string;
  imageURL: string;
  index: number;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  index,
  id,
  title,
  category,
  imageURL,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const { target } = useSelector(productSelector);

  const removeItem = () => {
    //@ts-ignore
    dispatch(deleteProduct({ id }));
    setActive(false);
  };

  const selectItem = (index: number) => {
    dispatch(setTarget(index));
    setActive((prev) => !prev);

    if (!active) {
      document.addEventListener('keyup', (event) => {
        if (event.key === 'Delete') {
          removeItem();
        }
      });
    } else {
      document.removeEventListener('keyup', (event) => {
        if (event.key === 'Delete') {
          removeItem();
        }
      });
    }
  };

  return (
    <div className="product__wrapper">
      <img
        onClick={() => selectItem(index)}
        className={active === true && target === index ? 'active' : ''}
        src={`./images/${imageURL}`}
        alt="product logo"
      />
      {active === true && target === index && (
        <svg
          onClick={removeItem}
          className="close"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.61 12.199L.54 3.129A1.833 1.833 0 113.13.536l9.07 9.07L21.27.54a1.833 1.833 0 012.592 2.592l-9.068 9.068 9.07 9.07a1.833 1.833 0 01-2.59 2.592l-9.072-9.07-9.073 9.073a1.833 1.833 0 01-2.591-2.592L9.61 12.2z"
            fill="#fff"></path>
        </svg>
      )}
      <div className="product__info">
        <div
          onClick={() => (dispatch(setCategoryType(category)), window.scrollTo(0, 0))}
          className="product__category">
          <span>{category}</span>
        </div>
        <div className="product__title">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};
