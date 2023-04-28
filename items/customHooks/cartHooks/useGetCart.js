import { useEffect, useRef, useState } from "react";
import { getSingleDoc } from "../../../firebase/services/getSingleDoc";

export const useGetCart = (cartList) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dataLoaded = useRef(false)

  useEffect(() => {
    if (cartList.length && !dataLoaded.current) {
      setLoading(true);
      const idUnicos = cartList.filter((p, ind, prods) => {
        return ind === prods.indexOf(p);
      });      
      const getProducts = async () => {
        let data = [];
        idUnicos.map((elem) => {
          async function fetchMyProduct() {
            const document = await getSingleDoc("Productos", elem);
            data = [...data, { ...document.data(), id: document.id }];
            if (data.length === idUnicos.length) {
              setProducts(data);
              setLoading(false)
            }
          }
          fetchMyProduct();
        });
      };
      try {
        getProducts();
        dataLoaded.current = true;
      } catch (e) {
        setError(e);
        setLoading(false)
      }
    }    
  }, [cartList]);

  return {products, loading, error};
};
