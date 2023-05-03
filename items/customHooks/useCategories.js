import { createFactory, useCallback, useEffect, useRef, useState } from "react";
import { getCollection } from "../../firebase/services/getCollection";
import { useSessionStorage } from "./storageHooks/useSessionStorage";

export const useCategories = () => {
  const [categoriesError, setCategoriesError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useSessionStorage(
    "CATEGORIAS_STORAGE_SESSION_CONTEXT",
    []
  );  
  const catFetched = useRef(false)
  const getCategories = useCallback(async () => {    
    setLoadingCategories(true);
    getCollection("Categorias")
      .then((res) => {
        sessionStorage.setItem(
          "CATEGORIAS_STORAGE_SESSION_CONTEXT",
          JSON.stringify(res)
        );
        setCategories(res);
        console.log("fetch categories");        
      })
      .catch(() => {
        setCategoriesError("Categories fetching error");
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }, []);
  useEffect(() => {
    if (categories.length || catFetched.current) return;
    catFetched.current = true
    getCategories();
  }, []);
  const getMarcas = (catSelected) => {
    const obj = categories.filter((cat) => cat.id === catSelected)[0];
    return obj.Marcas;
  };
  const getSubcategories = (catSelected) => {
    const obj = categories.filter((cat) => cat.id === catSelected)[0];
    return obj.SubCat1;
  };
  const getModelos = (catSelected) => {
    const obj = categories.filter((cat) => cat.id === catSelected)[0];
    return obj.Modelos;
  };
  return {
    categories,
    getField: { getMarcas, getSubcategories, getModelos },
    setCategories,
    loadingCategories,
    categoriesError,
    getCategories,
  };
};
