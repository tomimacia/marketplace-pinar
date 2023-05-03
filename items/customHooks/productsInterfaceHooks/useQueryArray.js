import { limit, orderBy, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCategoria, usePriceMinMax, useProductOrder, useSearchInputValue, useSubCat1 } from "../../../contexts/productsContext";

export const useQueryArray = () => {
  const categoria = useCategoria()
  const searchInputValue = useSearchInputValue()
  const productOrder = useProductOrder()
  const subCat1 = useSubCat1()
  const priceMinMax = usePriceMinMax()  
  const [queryArr, setQueryArr] = useState([]);
  

  useEffect(() => {
    if (categoria || searchInputValue.length) {
      let arr = [];
      if (searchInputValue.length > 0) {
        arr = [
          ...arr,
          where("SearchValues", "array-contains-any", searchInputValue.map(value=>value.toLowerCase())),
        ];
      }
      if (categoria) {
        arr = [...arr, where("Categoria", "==", categoria)];
      }
      if (subCat1) {
        arr = [...arr, where("SubCat1", "==", subCat1)];
      }
      if (productOrder) {
        arr = [...arr, orderBy("Precio", productOrder)];
      }
      setQueryArr([
        ...arr,
        where("Precio", "<=", priceMinMax.max),
        where("Precio", ">=", priceMinMax.min),
        limit(30),
      ]);
      console.log("queryArr");
    }
  }, [searchInputValue,subCat1, categoria, priceMinMax,productOrder]);
  return { queryArr };
};
