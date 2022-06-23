import { useDispatch, useSelector } from 'react-redux';
import { filterSelector, setCategoryType } from '../../redux/slices/filterSlice';

const categories = ['Show all', 'Design', 'Branding', 'Illustration', 'Motion'];

export const Categories = () => {
  const { categoryType } = useSelector(filterSelector);

  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            onClick={() => dispatch(setCategoryType(category))}
            className={category === categoryType ? 'activeC' : ''}
            key={index}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
