import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/clientApp";

export const useSellerID = (sellerID) => {
  const [products, setProducts] = useState([]);
  const [loadedProducts, setLoadedProducts] = useState(true);
  const [prodError, setProdError] = useState(null);
  const productsCollectionRef = collection(firestore, "Productos");
  const queryArr = [
    productsCollectionRef,
    limit(10),
    where("UserID", "==", sellerID),
  ];
  useEffect(() => {
    setLoadedProducts(false);
    const getProducts = async () => {
      const prevData = await getDocs(query(...queryArr));
      const data = prevData.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(data);
      setLoadedProducts(true);
      console.log("render");
    };
    try {
      getProducts();
    } catch (err) {
      setProdError(err);
      console.log(err);
    }
  }, []);
  return { products, loadedProducts, prodError };
};
