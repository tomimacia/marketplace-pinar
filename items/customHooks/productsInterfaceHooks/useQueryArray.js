import { collection, limit, orderBy, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../firebase/clientApp";

export const useQueryArray = (searchInputValue, categoria, subCat1) => {
  const productsCollectionRef = collection(firestore, "Productos");
  const [queryArr, setQueryArr] = useState([productsCollectionRef, limit(1)]);
  const [priceMinMax, setPriceMinMax] = useState({ min: 0, max: Infinity });
  const [productOrder, setProductOrder] = useState();

  useEffect(() => {
    if (categoria || searchInputValue.length) {
      let arr = [productsCollectionRef];
      if (searchInputValue.length > 0) {
        arr = [
          ...arr,
          where("SearchValues", "array-contains-any", searchInputValue),
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
  }, [searchInputValue, categoria, subCat1, priceMinMax, productOrder]);
  return { queryArr, priceMinMax, setPriceMinMax,productOrder, setProductOrder };
};
