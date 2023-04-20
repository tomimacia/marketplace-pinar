import { useEffect, useState } from "react";
import { useCategoria } from "../../../contexts/productsContext";
import { useCategories } from "../useCategories";

export const useGetSections = () => {
  const categoria = useCategoria();
  const [sections, setSections] = useState([]);
  const { categories, loadingCategories, categoriesError } = useCategories();

  useEffect(() => {
    if (categoria && categories.length > 0) {
      const catSel = categories.filter((cat) => categoria === cat.id);
      setSections(catSel[0]?.SubCat1);
    }
  }, [categoria]);
  return { sections, sectionsLoading: loadingCategories };
};
