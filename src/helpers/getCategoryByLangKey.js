export const getCategoryByLangKey = (categorieContents, langKey) => {
  if (Array.isArray(categorieContents)) {
    for (const category of categorieContents) {
      if (category.langKey === langKey) {
        return category;
      }
    }
  }

  return null; // Return null if no matching category is found
};
