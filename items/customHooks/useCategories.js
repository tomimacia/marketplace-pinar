import { useEffect, useRef, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { getCollection } from "../../firebase/services/getCollection";

export const useCategories = () => {
  const catStorageRef = useRef(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useSessionStorage(
    "CATEGORIAS_STORAGE_SESSION_CONTEXT",
    []
  );
  useEffect(() => {
    if (!categories.length) {
      setLoadingCategories(true);
      getCollection("Categorias")
        .then((res) => {
          sessionStorage.setItem(
            "CATEGORIAS_STORAGE_SESSION_CONTEXT",
            JSON.stringify(res)
          );            
          setCategories(res);
          console.log("fetched categories");
          catStorageRef.current = false;
        })
        .catch((e) =>{
          setCategoriesError("Categories fetching error");
          catStorageRef.current = true;
        })
        .finally(() => {
          setLoadingCategories(false);          
        });
    }
  }, []);
  return { categories, loadingCategories, categoriesError };
};
