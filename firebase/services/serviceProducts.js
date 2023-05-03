import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../clientApp";

export const getProducts = async (thisCollection,queryArr) => {
  const productsCollectionRef = collection(firestore, thisCollection);
  const finalQuery = [
    productsCollectionRef,
    ...queryArr
  ];
  const prevData = await getDocs(query(...finalQuery));
  const data = prevData.docs.map((product) => ({
    ...product.data(),
    id: product.id,
  }));
  console.log("fetched products");
  return data;
};
