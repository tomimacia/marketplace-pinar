import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { getMultipleDocs } from "../../firebase/services/serviceCategories";

export const useCategories = () => {
  const catStorageRef = useRef(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useLocalStorage(
    "CATEGORIAS_STORAGE_SESSION_CONTEXT",
    []
  );
  useEffect(() => {
    if (!categories.length && catStorageRef.current) {
      setLoadingCategories(true);
      getMultipleDocs("Categorias")
        .then((res) => {
          sessionStorage.setItem(
            "CATEGORIAS_STORAGE_SESSION_CONTEXT",
            JSON.stringify(res)
          );            
          setCategories(res);
          console.log("fetched categories");
        })
        .catch((e) => setCategoriesError("Categories fetching error"))
        .finally(() => {
          setLoadingCategories(false);
          catStorageRef.current = false;
        });
    }
  }, [categories]);
  return { categories, loadingCategories, categoriesError };
};
