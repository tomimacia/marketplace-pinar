import { getDocs, query } from "firebase/firestore";

export const getProducts = async (queryArr) => {
  const prevData = await getDocs(query(...queryArr));
  const data = prevData.docs.map((product) => ({
    ...product.data(),
    id: product.id,
  }));
  console.log("render");
  return data;
};
