import React, { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
  CategoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const cateGoryMap = await getCategoriesAndDocuments();
      console.log(cateGoryMap);
      setCategoriesMap(cateGoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
