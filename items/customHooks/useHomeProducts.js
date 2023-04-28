import { limit, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getProducts } from "../../firebase/services/serviceProducts";

export const useHomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadedProducts, setLoadedProducts] = useState(true);
  const [prodError, setProdError] = useState(null); 
  const queryArr = [    
    limit(10),
    where("Descuento", ">", 0),
  ];
  useEffect(() => {
    setLoadedProducts(false);
    const updateProducts = async () => {
      const data = await getProducts("Productos",queryArr);      
      setProducts(data);
      setLoadedProducts(true);
      console.log("fetched Home Products");
    };
    try {
      updateProducts();
    } catch (err) {
      setProdError(err);
      console.log(err);
    }
  }, []);
  return { products, loadedProducts, prodError };
};