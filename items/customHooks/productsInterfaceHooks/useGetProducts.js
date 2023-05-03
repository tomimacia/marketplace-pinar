import { useEffect, useState } from "react";
import {
  useCategoria,
  useSearchInputValue,
  useSetMarcas
} from "../../../contexts/productsContext";
import { getProducts } from "../../../firebase/services/serviceProducts";
import { filterLocalProducts } from "../../helpers.js/filterLocalProducts";
import { updateMarcas } from "../../helpers.js/updateMarcas";
import { useQueryArray } from "./useQueryArray";

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
      getProducts("Productos", queryArr)
        .then((response) => {
          setProducts(response);
          const currentMarcas = updateMarcas(response);
          setMarcas(currentMarcas);
        })
        .catch((e) => {
          setProdError(e);
        })
        .finally(() => setLoadingProducts(false));
    }
  }, [queryArr]);

  return {
    products: filterLocalProducts(products),
    setProducts,
    loadingProducts,
  };
};
