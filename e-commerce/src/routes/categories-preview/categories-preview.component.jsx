import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../components/contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';

/* 
  Object.keys() returns an array whose elements are strings corresponding to the enumerable properties found directly upon object .
  ["a", "b", "c"]
  ["hats", "jackets", "mens", "sneakers", "womens"]
*/

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
