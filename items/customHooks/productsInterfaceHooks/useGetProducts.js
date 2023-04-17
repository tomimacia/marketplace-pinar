import { getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetProducts = (categoria, searchInputValue, queryArr) => {
  const [loadedProducts, setLoadedProducts] = useState(false);
  const [marcas, setMarcas] = useState({});
  const [products, setProducts] = useState([]);

  // getProducts
  useEffect(() => {
    if (categoria || searchInputValue.length > 0) {
      const getProducts = async () => {
        setLoadedProducts(false);
        const prevData = await getDocs(query(...queryArr));
        const data = prevData.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(data);
        setLoadedProducts(true);
        console.log("render");
      };

      getProducts();
    }
  }, [queryArr]);

  useEffect(() => {
    filtrarMarcas(products);
  }, [products]);

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
  return { products, setProducts, marcas, setMarcas, loadedProducts };
};
