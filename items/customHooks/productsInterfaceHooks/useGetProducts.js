import { useEffect, useState } from "react";
import {
  useCategoria,
  useSearchInputValue,
  useSetMarcas,
} from "../../../contexts/productsContext";
import { useQueryArray } from "./useQueryArray";
import {getProducts} from "../../../firebase/services/serviceProducts"


export const useGetProducts = () => {
  const categoria = useCategoria();
  const searchInputValue = useSearchInputValue();
  const setMarcas = useSetMarcas();
  const { queryArr } = useQueryArray();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (queryArr.length > 2 && (searchInputValue.length || categoria)) {
      setLoadingProducts(true);
      getProducts(queryArr)
        .then((response) => {
          setProducts(response);
          const currentMarcas = response.reduce(
            (acc, prod) =>
              prod.Marca !== "Otro"
                ? { ...acc, [prod.Marca]: acc[prod.Marca] + 1 || 1 }
                : { ...acc },
            {}
          );      
          setMarcas(currentMarcas);
        })
        .catch((e) => {
          setProdError(e);
        })
        .finally(() => setLoadingProducts(false));
    }
  }, [queryArr]);
  
  return { products, setProducts, loadingProducts };
};
