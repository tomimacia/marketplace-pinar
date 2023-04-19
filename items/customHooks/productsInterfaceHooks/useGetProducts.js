import { getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useCategoria,
  useSearchInputValue,
  useSetMarcas,
} from "../../../contexts/productsContext";

export const useGetProducts = (queryArr) => {
  const categoria = useCategoria();
  const [productsError, setProductsError] = useState(null);
  const searchInputValue = useSearchInputValue();
  const [loadedProducts, setLoadedProducts] = useState(false);
  const setMarcas = useSetMarcas();

  const [products, setProducts] = useState([]);
  // getProducts
  useEffect(() => {
    if (categoria || searchInputValue.length > 0) {
      const getProducts = async () => {
        setLoadedProducts(false);
        try {
          const prevData = await getDocs(query(...queryArr));
          const data = prevData.docs.map((product) => ({
            ...product.data(),
            id: product.id,
          }));
          setProducts(data);
          filtrarMarcas(data);
          console.log("render");
        } catch (e) {
          setProductsError(e);
        } finally {
          setLoadedProducts(true);
        }
      };

      getProducts();
    }
  }, [queryArr]);

  const filtrarMarcas = (prop) => {
    const currentMarcas = prop.reduce(
      (acc, prod) =>
        prod.Marca !== "Otro"
          ? { ...acc, [prod.Marca]: acc[prod.Marca] + 1 || 1 }
          : { ...acc },
      {}
    );

    setMarcas(currentMarcas);
  };
  return { products, setProducts, productsError, loadedProducts };
};
