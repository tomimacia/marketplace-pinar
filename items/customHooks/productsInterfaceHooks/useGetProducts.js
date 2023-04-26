import { useCallback, useEffect, useState } from "react";
import {
  useCategoria,
  useDescuento,
  useMarcasPicked,
  useSearchInputValue,
  useSetMarcas,
} from "../../../contexts/productsContext";
import { useQueryArray } from "./useQueryArray";
import { getProducts } from "../../../firebase/services/serviceProducts";
import { filterLocalProducts } from "../../helpers.js/filterLocalProducts";

export const useGetProducts = () => {
  const categoria = useCategoria();
  const descuento = useDescuento();
  const marcasPicked = useMarcasPicked();
  const searchInputValue = useSearchInputValue();
  const setMarcas = useSetMarcas();
  const { queryArr } = useQueryArray();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const updateMarcas = useCallback((value)=>{    
      return value.reduce((acc, prod) => {
        if (prod.Marca !== "Otro") {
          return { ...acc, [prod.Marca]: acc[prod.Marca] + 1 || 1 };
        } else return { ...acc };
      }, {});
    
  },[queryArr])
  useEffect(() => {
    if (queryArr.length > 2 && (searchInputValue.length || categoria)) {
      setLoadingProducts(true);
      getProducts("Productos",queryArr)
        .then((response) => {
          setProducts(response);
          const currentMarcas = updateMarcas(response)
           setMarcas(currentMarcas);
        })
        .catch((e) => {
          setProdError(e);
        })
        .finally(() => setLoadingProducts(false));
    }
  }, [queryArr]);

  return { products:filterLocalProducts(products,descuento,marcasPicked), setProducts, loadingProducts };
};
