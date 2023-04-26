import { collection, limit, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/clientApp";
import { getProducts } from "../../firebase/services/serviceProducts";

export const useSellerID = (sellerID) => {
  const [products, setProducts] = useState([]);
  const [loadedProducts, setLoadedProducts] = useState(true);
  const [prodError, setProdError] = useState(null); 
  const queryArr = [    
    limit(10),
    where("UserID", "==", sellerID),
  ];
  useEffect(() => {
    setLoadedProducts(false);
    const updateProducts = async () => {
      const data = await getProducts("Productos",queryArr);      
      setProducts(data);
      setLoadedProducts(true);
      console.log("render");
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
