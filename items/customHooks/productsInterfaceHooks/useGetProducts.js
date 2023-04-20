import { useEffect, useState } from "react";
import {
  useCategoria,
  useSearchInputValue,
  useSetMarcas,
} from "../../../contexts/productsContext";
import { getProducts } from "../../../services/serviceProducts";
import { useQueryArray } from "./useQueryArray";

export const useGetProducts = () => {
  const categoria = useCategoria();
  const searchInputValue = useSearchInputValue();
  const setMarcas = useSetMarcas();
  const { queryArr } = useQueryArray();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (queryArr.length > 2) {
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
