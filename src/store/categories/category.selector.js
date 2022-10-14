export const selectCategoriesMap = (state) => {
  console.log('selector fired');
  return state.categories.categories.reduce((acc, category) => {
    // distructure off the values of the data of docSnapshot
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, []);
};
