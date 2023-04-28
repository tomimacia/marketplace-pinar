import { useEffect, useRef, useState } from "react";
import { useSessionStorage } from "./storage/useSessionStorage";
import { getCollection } from "../../firebase/services/getCollection";

export const useCategories = () => {
  const catStorageRef = useRef(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useSessionStorage(
    "CATEGORIAS_STORAGE_SESSION_CONTEXT",
    []
  );
  const getCategories = async () => {
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
      .catch(() => {
        setCategoriesError("Categories fetching error");
        catStorageRef.current = true;
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  };
  useEffect(() => {
    if (categories.length) return;
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
