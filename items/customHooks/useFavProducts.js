import { useEffect, useState } from "react";

export const useFavProducts = (data,favList) => {
  const [products, setProducts] = useState(data);
  useEffect(() => {
    let newProds = products.filter((prd) => favList.includes(prd.id));
    setProducts(newProds);
  }, [favList]);
  return products;
};
